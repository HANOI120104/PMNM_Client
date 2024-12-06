'use client';
import { useState } from 'react';

export default function ForgotPasswordModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle the password recovery logic here
        console.log('Password recovery request:', formData);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Trigger Button */}

            <button
                className="text-blue-500 underline"
                onClick={() => setIsModalOpen(true)}
            >
                Quên mật khẩu?
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-lg p-6">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-black"
                            onClick={closeModal}
                        >
                            ×
                        </button>
                        <form onSubmit={handleSubmit} className="container mx-auto">
                            <h2 className="my-4 text-2xl font-semibold">Khôi phục mật khẩu</h2>
                            <div className="space-y-4 " >
                                {/* Username Input */}
                                <div className="grid grid-cols-3 items-center text-left">
                                    <label htmlFor="username" className="mr-4 col-span-1">Tên đăng nhập</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-[80%] border-b-2 px-2 py-1 col-span-2"
                                        placeholder="Nhập tên đăng nhập"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="grid grid-cols-3 items-center text-left">
                                    <label htmlFor="email" className="mr-4 col-span-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-[80%] border-b-2 px-2 py-1 col-span-2"
                                        placeholder="Nhập email của bạn"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="mt-4">
                                    <button
                                        className="text-blue-500 underline px-2"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Quay lại
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-[80%] py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600"
                                    >
                                        Khôi phục mật khẩu
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
