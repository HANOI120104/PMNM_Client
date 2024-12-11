'use client';
import { showErrorToast, showSuccessToast } from "@/components/Toast/toast";
import { HTTPMethod } from "@/types/enum";

import { useState } from "react";
import fetchApi from "@/utils/fetchApi";

export default function ForgetPassword() {
    const [formData, setFormData] = useState({
        email: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Simple email validation (could be enhanced)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            showErrorToast("Vui lòng nhập email hợp lệ.");
            return;
        }

        setIsSubmitting(true); // Disable button to prevent multiple submissions

        try {
            const response = await fetchApi(
                "/api/users/forgot-password",
                HTTPMethod.POST,
                formData,
                false
            );

            if (response) {
                showSuccessToast("Email khôi phục mật khẩu đã được gửi.");

            } else {
                showErrorToast("Kiểm tra lại email đã nhập.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            showErrorToast("Địa chỉ email không đúng. Vui lòng nhập lại.");
        } finally {
            setIsSubmitting(false); // Re-enable the button after submission
        }
    };

    return (
        <div
            className="relative z-0 w-full box-border"
            style={{
                backgroundImage: "url('/img/section-background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="container mx-auto py-20 text-center px-4">
                <form action="" onSubmit={handleSubmit}>
                    <h2 className="my-20 text-4xl font-bold">Khôi phục mật khẩu</h2>
                    <div className="container md:w-[50%] sm:w-[80%] mx-auto border-2 rounded-lg py-4 grid grid-cols-3 p-10">
                        <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                            <label htmlFor="email" className="mr-4">Email</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                            <input
                                onChange={handleInputChange}
                                value={formData.email}
                                type="text"
                                className="w-[90%] border-b-2 px-2"
                                placeholder="Nhập email của bạn"
                                name="email" // Ensure the name matches the field in formData
                            />
                        </div>
                        <div className="col-span-3 flex justify-center w-full mt-10">
                            <div className="flex flex-grow justify-center gap-4">
                                <a href="/signin" className="border-2 border-blue-400 delay-75 w-[90%] py-2 rounded-xl text-blue-400 hover:text-white hover:bg-blue-400">
                                    Quay lại
                                </a>
                                <button
                                    className="border-2 border-blue-400 delay-75 w-[90%] py-2 rounded-xl text-blue-400 hover:text-white hover:bg-blue-400"
                                    disabled={isSubmitting} // Disable button while submitting
                                >
                                    {isSubmitting ? 'Đang xử lý...' : 'Khôi phục mật khẩu'}
                                </button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
