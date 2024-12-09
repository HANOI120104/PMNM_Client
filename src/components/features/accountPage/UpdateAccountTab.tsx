/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
'use client';

import { useState, useEffect } from "react";
import SelectInput from "@/components/ui/app.selectninput";
import fetchApi from "@/utils/fetchApi";
import Cookies from "js-cookie";

export default function Update() {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        email: "",
        city: "",
        district: "",
        ward: "",
        fullAddress: "",
    });


    // Handle input change
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const token = Cookies.get('access_token');
    console.log(token);
    // Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const response = await fetchApi(`http://localhost:8000/api/user/${token}`, "PATCH", formData, true);

            if (response) {
                alert("Cập nhật thông tin thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-3 p-4">
            {/* Labels */}

            <div className="text-left col-span-1 my-2">
                <label className="py-2 font-bold text-xl block">Họ và tên:</label>
                <label className="py-2 font-bold text-xl block">Tuổi:</label>
                <label className="py-2 font-bold text-xl block">Giới tính:</label>
                <label className="py-2 font-bold text-xl block">Email:</label>
                <label className="py-2 font-bold text-xl block">Thành phố:</label>
                <label className="py-2 font-bold text-xl block">Quận:</label>
                <label className="py-2 font-bold text-xl block">Phường:</label>
                <label className="py-2 font-bold text-xl block">Địa chỉ đầy đủ:</label>
            </div>
            {/* Inputs */}
            <div className="text-left col-span-2 my-2">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-2 mb-2"
                />
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-2 mb-2"
                />
                <div className="mb-2">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleInputChange}
                        />{" "}
                        Nam
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleInputChange}
                        />{" "}
                        Nữ
                    </label>
                </div>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-2 mb-2"
                />
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-2 mb-2"
                />
                <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-2 mb-2"
                />
                <input
                    type="text"
                    name="ward"
                    value={formData.ward}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-2 mb-2"
                />

                <input
                    type="text"
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-2 mb-2"
                />
            </div>
            {/* Submit */}
            <div className="col-span-3 text-center">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={handleSubmit}
                >

                    Cập nhật
                </button>
            </div>
        </form>
    );
}
