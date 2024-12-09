/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';
import useSWR from 'swr';
import { useState } from 'react';
import Link from 'next/link';

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SearchPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Use SWR to fetch data
    const { data, error, isLoading } = useSWR('http://localhost:8005/api/donations', fetcher);

    const handleDetailClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Failed to load data</div>;
    }

    return (
        <div
            className="relative z-0 w-full box-border py-20"
            style={{
                backgroundImage: "url('/img/section-background.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="container mx-auto py-10 px-4">
                {/* Search Bar */}
                <div className="flex flex-wrap items-center my-6">
                    <p className="text-xl font-medium mb-2 sm:mb-0">Tra cứu</p>
                    <div className="flex flex-grow items-center border-2 mx-2 rounded-lg p-2">
                        <select
                            name="filter"
                            id="filter"
                            className="p-2 mx-2 outline-none bg-white rounded-lg"
                        >
                            <option value="">Tất cả</option>
                            <option value="donate">Ủng hộ</option>
                            <option value="help">Trợ giúp</option>
                        </select>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Nhập từ khóa..."
                            className="flex-grow p-2 mx-2 outline-none bg-gray-100 rounded-lg"
                        />
                        <button className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">
                            <i>
                                <img
                                    src="img/icons8-search-20.png"
                                    alt="Search"
                                    className="w-5 h-5"
                                />
                            </i>
                        </button>
                    </div>
                </div>
                {/* Search and Table */}
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2 border border-gray-300">Id</th>
                                <th className="p-2 border border-gray-300">Loại</th>
                                <th className="p-2 border border-gray-300">Số lượng</th>
                                <th className="p-2 border border-gray-300">Trạng thái</th>
                                <th className="p-2 border border-gray-300">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((donation: any) => (
                                <tr key={donation.id} className="text-center">
                                    <td className="p-2 border border-gray-300">{donation.id}</td>
                                    <td className="p-2 border border-gray-300">{donation.paymentMethod}</td>
                                    <td className="p-2 border border-gray-300">{donation.amount}</td>
                                    <td
                                        className={`p-2 border border-gray-300 ${donation.status === 'Pending'
                                            ? 'text-yellow-500'
                                            : 'text-green-500'
                                            }`}
                                    >
                                        {donation.status}
                                    </td>
                                    <td className="p-2 border border-gray-300">
                                        <Link href={'DonationDetail'}></Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
}
