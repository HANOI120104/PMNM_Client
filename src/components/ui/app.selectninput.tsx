// InputDropdown.tsx
import React, { useState, useEffect, useRef } from "react";

interface InputDropdownProps {
    onSelect: (value: string) => void;  // Prop để truyền dữ liệu lên parent
}

export default function InputDropdown({ onSelect }: InputDropdownProps) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const options = ["Tùy chọn 1", "Tùy chọn 2", "Tùy chọn 3", "Tùy chọn 4"];
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (option: string) => {
        setQuery(option);
        setIsOpen(false);
        onSelect(option);  // Truyền giá trị đã chọn lên parent
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-[90%]" ref={dropdownRef}>
            <input
                type="text"
                className="w-full px-2 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:rounded-lg"
                placeholder="Tìm kiếm hoặc chọn..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
            />
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
