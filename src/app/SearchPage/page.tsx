'use client';
import { useState } from 'react';

export default function Register() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDetailClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                            <tr className="text-center">
                                <td className="p-2 border border-gray-300">1</td>
                                <td className="p-2 border border-gray-300">Tiền</td>
                                <td className="p-2 border border-gray-300">100.000</td>
                                <td className="p-2 border border-gray-300 text-green-500">Đã nhận</td>
                                <td className="p-2 border border-gray-300">
                                    <button
                                        className="text-blue-500 underline"
                                        onClick={handleDetailClick}
                                    >
                                        Xem chi tiết
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg w-full max-w-4xl p-6">
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                                onClick={closeModal}
                            >
                                ×
                            </button>
                            <form className="container mx-auto text-center">
                                <h2 className="my-4 text-4xl font-bold">Dành cho người cần cứu nạn</h2>
                                <div className="container md:w-[50%] sm:w-[70%] mx-auto border-2 rounded-lg py-4 grid grid-cols-3">
                                    <div className="col-span-3">
                                        <p className="text-xl font-semibold">Thông tin liên hệ</p>
                                    </div>
                                    {/* Form Fields */}
                                    <div className="col-span-1 w-full my-6 flex justify-start items-start pl-6">
                                        <label htmlFor="firstName" className="mr-4">
                                            Họ và tên đệm
                                        </label>
                                    </div>
                                    <div className="col-span-2 w-full my-6 flex justify-start items-start">
                                        <input
                                            type="text"
                                            className="w-[90%] border-b-2 px-2"
                                            placeholder="Nhập họ và tên đệm của bạn"
                                        />
                                    </div>
                                    <div className="col-span-1 w-full my-6 flex justify-start items-start pl-6">
                                        <label htmlFor="firstName" className="mr-4">
                                            Họ và tên đệm
                                        </label>
                                    </div>
                                    <div className="col-span-2 w-full my-6 flex justify-start items-start">
                                        <input
                                            type="text"
                                            className="w-[90%] border-b-2 px-2"
                                            placeholder="Nhập họ và tên đệm của bạn"
                                        />
                                    </div>
                                    <div className="col-span-1 w-full my-6 flex justify-start items-start pl-6">
                                        <label htmlFor="firstName" className="mr-4">
                                            Họ và tên đệm
                                        </label>
                                    </div>
                                    <div className="col-span-2 w-full my-6 flex justify-start items-start">
                                        <input
                                            type="text"
                                            className="w-[90%] border-b-2 px-2"
                                            placeholder="Nhập họ và tên đệm của bạn"
                                        />
                                    </div>
                                    <div className="col-span-1 w-full my-6 flex justify-start items-start pl-6">
                                        <label htmlFor="firstName" className="mr-4">
                                            Họ và tên đệm
                                        </label>
                                    </div>
                                    <div className="col-span-2 w-full my-6 flex justify-start items-start">
                                        <input
                                            type="text"
                                            className="w-[90%] border-b-2 px-2"
                                            placeholder="Nhập họ và tên đệm của bạn"
                                        />
                                    </div>

                                    {/* Add other fields here */}
                                    <div className="col-span-3 mt-4 py-4 flex justify-center">
                                        <button className="border-2 border-blue-400 delay-75 w-[90%] py-2 rounded-xl text-blue-400 hover:text-white hover:bg-blue-400">
                                            Quay lại
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
