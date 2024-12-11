/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
'use client';
import { useState } from 'react';
import InputField from '@/components/ui/InputField'; // Import InputField
import Button from '@/components/ui/Button';         // Import Button

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
                        <div onSubmit={handleSubmit} className="container mx-auto text-center">
                            <h2 className="my-4 text-2xl font-semibold">Khôi phục mật khẩu</h2>
                            <div className="space-y-4   ">
                                {/* Username Input */}
                                <InputField
                                    label="Tên đăng nhập"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="Nhập tên đăng nhập"
                                />

                                {/* Email Input */}
                                <InputField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Nhập email của bạn"
                                />

                                {/* Submit Button */}
                                <Button text="Quay lại" onClick={() => setIsModalOpen(false)} />
                                <Button text="Khôi phục mật khẩu" onClick={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
