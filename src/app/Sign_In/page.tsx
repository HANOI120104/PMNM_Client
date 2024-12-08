'use client';

import React, { useState } from 'react';
import InputField from '@/components/ui/InputField';
import ForgetPassword from '@/components/features/Authentication/ForgetPasswordModal';
import { useRouter } from 'next/navigation'; // Import useRouter
import Cookies from "js-cookie";

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const router = useRouter(); // Initialize the router

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Đăng nhập thành công!');
                console.log('User Data:', result);

                if (result.accessToken) {
                    Cookies.set('id', result.id, {
                        expires: 1 / 24, // Expires in 1 hour
                        secure: true, // Ensures the cookie is only sent over HTTPS
                        sameSite: "strict", // Prevents CSRF attacks
                    })
                    Cookies.set("access_token", result.accessToken, {
                        expires: 1 / 24, // Expires in 1 hour
                        secure: true, // Ensures the cookie is only sent over HTTPS
                        sameSite: "strict", // Prevents CSRF attacks
                    });
                    router.push("/");
                    // // Store token securely (example: sessionStorage)
                    // sessionStorage.setItem('authToken', result.token);

                    router.push('/Account'); // Redirect to the homepage
                } else {
                    alert(result.message || 'Đăng nhập thất bại!');
                }

            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại!');
        }
    };


    return (
        <div
            className="relative z-0 py-20 w-full box-border"
            style={{
                backgroundImage: "url('/img/section-background.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="container mx-auto text-center">
                <h2 className="my-20 text-4xl font-bold">Trang đăng nhập</h2>
                <form
                    className="container md:w-[50%] sm:w-[80%] mx-auto border-2 rounded-lg py-4 p-10"
                    onSubmit={handleSubmit}
                >
                    {/* Sử dụng InputField cho Username */}
                    <div className="mb-10">
                        <InputField
                            label="Tên đăng nhập"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Nhập tên đăng nhập của bạn"
                        />
                    </div>

                    {/* Sử dụng InputField cho Password */}
                    <div className='my-4'>
                        <InputField
                            label="Mật khẩu"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Nhập mật khẩu của bạn"
                        />
                    </div>

                    {/* Forget Password */}
                    <div className="my-6 text-right">
                        <ForgetPassword />
                    </div>

                    {/* Submit Button */}
                    <div className="w-full mt-10">
                        <button
                            type="submit"
                            className="border-2 border-blue-400 delay-75 w-full py-2 rounded-xl text-blue-400 hover:text-white hover:bg-blue-400"
                        >
                            Đăng nhập
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="flex justify-center my-4 gap-2">
                        <p>Bạn đã chưa có tài khoản?</p>
                        <a href="/Sign_Up" className="font-bold text-blue-400">
                            Đăng ký ngay
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
