"use client";
import useSWR from "swr";
import { useState } from "react";
import { API_BASE_URL } from "@/utils/fetchApi";

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // Define the number of items per page
  const itemsPerPage = 5;

  // Use SWR to fetch data once
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/api/donations`,
    fetcher
  );

  // Filtered data based on the search query
  const filteredData = data?.filter((donation: any) =>
    donation.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginated data for the current page
  const paginatedData = filteredData?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to the first page when a new search is made
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load data</div>;
  }

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
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
  function encodePhoneNumber(phoneNumber: string) {
    // Kiểm tra độ dài số điện thoại
    if (phoneNumber.length !== 10) {
      throw new Error("Số điện thoại phải có độ dài 10 ký tự.");
    }

    const firstPart = phoneNumber.slice(0, 3); // 3 số đầu
    const lastPart = phoneNumber.slice(-2); // 2 số cuối
    const maskedPart = "*".repeat(phoneNumber.length - 5); // Phần giữa được thay bằng "*"

    return firstPart + maskedPart + lastPart;
  }
  return (
    <div className="relative z-0 w-full box-border py-20">
      <div className="container mx-auto py-10 px-4">
        {/* Search Bar */}
        <div className="flex flex-wrap items-center my-6">
          <p className="text-xl font-medium mb-2 sm:mb-0">Tra cứu</p>
          <div className="flex flex-grow items-center border-2 mx-2 rounded-lg p-2">
            <input
              type="text"
              name="search"
              id="search"
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
                <th className="p-2 border border-gray-300">
                  Họ và tên người ủng hộ
                </th>
                <th className="p-2 border border-gray-300">Điện thoại</th>
                <th className="p-2 border border-gray-300">Loại</th>
                <th className="p-2 border border-gray-300">Số tiền ủng hộ</th>
                <th className="p-2 border border-gray-300">Trạng thái</th>
                <th className="p-2 border border-gray-300">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((donation: any) => (
                <tr key={donation.id} className="text-center">
                  <td className="p-2 border border-gray-300">
                    {donation.fullName}
                  </td>

                  <td className="p-2 border border-gray-300">
                    {encodePhoneNumber(donation.phone)}
                  </td>

                  <td className="p-2 border border-gray-300">
                    {donation.supportRequestTypeName}
                  </td>

                  <td className="p-2 border border-gray-300">
                    {formatMoney(donation?.amount)}
                  </td>

                  <td
                    className={`p-2 border border-gray-300 ${
                      donation.status === "Pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {convertStatus(donation.status)}
                  </td>

                  <td className="p-2 border border-gray-300">
                    {donation.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg"
            onClick={() => handlePageChange(page > 1 ? page - 1 : page)}
            disabled={page === 1}
          >
            Previous
          </button>
          <p className="text-lg">{`Page ${page} of ${Math.ceil(
            filteredData?.length / itemsPerPage
          )}`}</p>
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg"
            onClick={() =>
              handlePageChange(
                page < Math.ceil(filteredData?.length / itemsPerPage)
                  ? page + 1
                  : page
              )
            }
            disabled={page === Math.ceil(filteredData?.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
