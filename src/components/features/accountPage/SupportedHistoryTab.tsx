/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import fetchApi, { API_BASE_URL } from "@/utils/fetchApi";
import { HTTPMethod } from "@/types/enum";
interface Props {
    userData: any;
}

// Fetcher function for SWR
export default function DonationUser(props: Props) {
    const { userData } = props;
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Number of items per page
    const itemsPerPage = 5;



    // Fetch donation data
    useEffect(() => {
        const fetchDonations = async () => {
            if (!userData.email) return;

            try {
                const response = await fetchApi(
                    `/api/supportRequests/getSupportRequestByUserId/${userData.email}`,
                    HTTPMethod.GET,
                    null,
                    true
                );
                if (!response) throw new Error("Failed to fetch donation data");

                setData(response);
            } catch (err: unknown) {
                setError(
                    err instanceof Error ? err.message : "Unknown error occurred"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, [userEmail]);

    // Filtered data based on search query
    const filteredData = data.filter((donation) =>
        donation.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Paginated data for current page
    const paginatedData = filteredData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(1); // Reset to first page on new search
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const formatMoney = (amount: number) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

    const convertStatus = (status: string) => {
        switch (status) {
            case "Pending":
                return "Đợi duyệt";
            case "Processed":
                return "Đã duyệt";
            default:
                return "Từ chối";
        }
    };

    const encodePhoneNumber = (phoneNumber: string) => {
        if (phoneNumber.length !== 10) return null;

        const firstPart = phoneNumber.slice(0, 3);
        const lastPart = phoneNumber.slice(-2);
        return firstPart + "*".repeat(phoneNumber.length - 5) + lastPart;
    };

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="relative z-0 w-full py-20">
            <div className="container mx-auto py-10 px-4">
                {/* Search Bar */}
                <div className="flex flex-wrap items-center my-6">
                    <p className="text-xl font-medium mb-2 sm:mb-0">Tra cứu</p>
                    <div className="flex-grow flex items-center border-2 mx-2 rounded-lg p-2">
                        <input
                            type="text"
                            placeholder="Nhập từ khóa..."
                            className="flex-grow p-2 mx-2 outline-none bg-gray-100 rounded-lg"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2 border">Họ và tên</th>
                                <th className="p-2 border">Điện thoại</th>
                                <th className="p-2 border">Loại</th>
                                <th className="p-2 border">Số tiền</th>
                                <th className="p-2 border">Trạng thái</th>
                                <th className="p-2 border">Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((donation) => (
                                <tr key={donation.id}>
                                    <td className="p-2 border">{donation.fullName}</td>
                                    <td className="p-2 border">
                                        {encodePhoneNumber(donation.phone)}
                                    </td>
                                    <td className="p-2 border">
                                        {donation.supportRequestTypeName}
                                    </td>
                                    <td className="p-2 border">
                                        {formatMoney(donation.amount)}
                                    </td>
                                    <td className="p-2 border">
                                        {convertStatus(donation.status)}
                                    </td>
                                    <td className="p-2 border">{donation.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                        Previous
                    </button>
                    <p>{`Page ${page} of ${Math.ceil(
                        filteredData.length / itemsPerPage
                    )}`}</p>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= Math.ceil(filteredData.length / itemsPerPage)}
                        className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
