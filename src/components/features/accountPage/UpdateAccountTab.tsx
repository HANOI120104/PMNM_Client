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
                <label className="py-2 font-bold text-xl block">Họ và tên:</label>
                <label className="py-2 font-bold text-xl block">Tuổi:</label>
                <label className="py-2 font-bold text-xl block">Giới tính:</label>
                <label className="py-2 font-bold text-xl block">Email:</label>
                <label className="py-2 font-bold text-xl block">Thành phố:</label>
                <label className="py-2 font-bold text-xl block">Quận:</label>
                <label className="py-2 font-bold text-xl block">Phường:</label>
                <label className="py-2 font-bold text-xl block">Địa chỉ đầy đủ:</label>
            </div>
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
                <div className="py-2 w-full border px-2 py-2 mb-2">
                    <SelectInput />
                </div>
                <div className="py-2 w-full border px-2 py-2 mb-2">
                    <SelectInput />
                </div>
                <div className="py-2 w-full border px-2 py-2 mb-2">
                    <SelectInput />
                </div>
                <input
                    type="text"
                    name="fullAddress"
                    value={formData.fullAddress}
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
