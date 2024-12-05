'use client'
import React, { useState } from "react";

export default function InputDropdown() {
    const [query, setQuery] = useState(""); // Dữ liệu người dùng nhập
    const [isOpen, setIsOpen] = useState(false); // Trạng thái hiển thị dropdown
    const options = ["Tùy chọn 1", "Tùy chọn 2", "Tùy chọn 3", "Tùy chọn 4"]; // Danh sách tùy chọn

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (option: any) => {
        setQuery(option); // Đặt giá trị vào input
        setIsOpen(false); // Đóng dropdown
    };

    return (
        <div className="relative w-[90%]">
            {/* Input */}
            <input type="text" className="w-full px-2 border-b-2 border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:rounded-lg" placeholder="Tìm kiếm hoặc chọn..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true); // Mở dropdown khi nhập
                }}
                onFocus={() => setIsOpen(true)} // Mở dropdown khi focus vào input
            />

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <div
                                key={index}
                                className="p-2 cursor-pointer hover:bg-blue-100"
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </div>
                        ))
                    ) : (
                        <div className="p-2 text-gray-500">Không tìm thấy kết quả</div>
                    )}
                </div>
            )}
        </div>
    );
}