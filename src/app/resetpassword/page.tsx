'use client';
import { showErrorToast, showSuccessToast } from "@/components/Toast/toast";
import { HTTPMethod } from "@/types/enum";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';  // Import useRouter to access the URL
import fetchApi, { API_BASE_URL } from "@/utils/fetchApi";

export default function ResetPassword() {
    const [formData, setFormData] = useState({
        passwordNew: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [token, setToken] = useState<string | null>(null); // Lưu token vào state

    // Lấy token từ URL
    const getTokenFromURL = () => {
        const url = new URL(window.location.href);
        const token = url.searchParams.get("token");
        return token;
    };

    useEffect(() => {
        const tokenFromURL = getTokenFromURL();
        if (tokenFromURL) {
            setToken(tokenFromURL); // Lưu token vào state
        } else {
            showErrorToast("Token không hợp lệ.");
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token) return; // If token is not available, do nothing

        setIsSubmitting(true); // Disable button to prevent multiple submissions
        const option = {
            method: HTTPMethod.POST,
            body: JSON.stringify(formData),
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/users/reset-password`,
                option)
            if (response) {
                showSuccessToast("Tạo mật khẩu mới thành công.");

            } else {
                showErrorToast("Vui lòng nhập mật khẩu.");
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            showErrorToast("Đã xảy ra lỗi. Vui lòng thử lại.");
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
                            <label htmlFor="password" className="mr-4">Mật khẩu mới</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                            <input
                                onChange={handleInputChange}
                                value={formData.passwordNew}
                                type="passwordNew"
                                className="w-[90%] border-b-2 px-2"
                                placeholder="Nhập mật khẩu mới"
                                name="passwordNew"
                            />
                        </div>
                        <div className="col-span-3 flex justify-center w-full mt-10">
                            <div className="flex flex-grow justify-center gap-4">
                                <a
                                    href="/signin"
                                    className="border-2 border-blue-400 delay-75 w-[90%] py-2 rounded-xl text-blue-400 hover:text-white hover:bg-blue-400"
                                >
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
