/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
'use client'
import { useState } from "react";
import SelectInput from "@/components/ui/app.selectninput";

export default function Update() {
    const [formData, setFormData] = useState({
        name: "Nguyễn Văn A",
        age: 25,
        gender: "Male",
        email: "example@example.com",
        city: "",
        district: "",
        ward: "",
        fullAddress: "123 Main St, HCM City",
    });

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit form data
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/update-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Profile updated successfully!");
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-3 p-4">
            <div className="text-left col-span-1 my-2">
                <label className="py-2 font-bold text-xl block">Mật khẩu hiện tại:</label>
                <label className="py-2 font-bold text-xl block">Mật khẩu mới:</label>
                <label className="py-2 font-bold text-xl block">Xác nhận:</label>
            </div>
            <div className="text-left col-span-2 my-2">
                <input
                    type="password"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-2 mb-2"
                />
                <input
                    type="password"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-2 mb-2"
                />

                <input
                    type="email"
                    name="password"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border px-2 py-2 mb-2"
                />


            </div>
            <div className="col-span-3 text-center">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Cập nhật
                </button>
            </div>
        </form>
    );
}
