/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client'
import Select from '@/components/ui/app.selectninput'
import fetchApi from '@/utils/fetchApi';
import { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPass: '',
        firstName: '',
        lastName: '',
        gender: '',
        roles: 'user',
        phone: '',
        email: '',
        city: '',
        district: '',
        ward: '',
        address: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Register success:', data);
        } catch (error) {
            console.error('Register failed:', error);
        }
    };

    // const handleSelectCity = (value: string) => {
    //     setFormData({
    //         ...formData,
    //         city: value,  // Lưu giá trị thành phố từ dropdown
    //     });
    // };

    // const handleSelectDistrict = (value: string) => {
    //     setFormData({
    //         ...formData,
    //         district: value,  // Lưu giá trị thành phố từ dropdown
    //     });
    // };
    // const handleSelectWard = (value: string) => {
    //     setFormData({
    //         ...formData,
    //         ward: value,  // Lưu giá trị thành phố từ dropdown
    //     });
    // };

    return (
        <div className="relative z-0 w-full box-border "
            style={{
                backgroundImage: "url('/img/section-background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="container mx-auto py-20 text-center px-4">
                <form action="">
                    <h2 className="my-20 text-4xl font-bold">Đăng ký tình nguyện viên</h2>
                    <div className="container sm:w-[80%] md:w-[50%] mx-auto border-2 rounded-lg py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="col-span-3">
                            <p className="text-xl font-semibold">Tài khoản</p>
                        </div>
                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="username" className="mr-4">Tên đăng nhập</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <input type="text" name='username' onChange={handleInputChange} id="username" className="w-full sm:w-[90%] border-b-2 px-2 py-2" placeholder="Nhập tên đăng nhập của bạn" />
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="password" className="mr-4">Mật khẩu</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <input type="password" name="password" onChange={handleInputChange} id="password" className="w-full sm:w-[90%] border-b-2 px-2 py-2" placeholder="Nhập mật khẩu của bạn" />
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="confirm-password" className="mr-4">Xác nhận mật khẩu</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <input type="password" name="confirmPass" onChange={handleInputChange} id="confirm-password" className="w-full sm:w-[90%] border-b-2 px-2 py-2" placeholder="Nhập mật khẩu xác nhận của bạn" />
                        </div>

                        <div className="col-span-3 mt-4 py-4 flex justify-center">
                            <p className="text-xl w-full font-semibold border-t-2 border-dashed pt-6">Thông tin cá nhân</p>
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="full-name" className="mr-4">Họ và tên đệm</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <input type="text" name="firstName" onChange={handleInputChange} id="full-name" className="w-full sm:w-[90%] border-b-2 px-2 py-2" placeholder="Nhập họ và tên đệm của bạn" />
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="name" className="mr-4">Tên</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <input type="text" name="lastName" onChange={handleInputChange} id="name" className="w-full sm:w-[90%] border-b-2 px-2 py-2" placeholder="Nhập tên của bạn" />
                        </div>

                        <div className="col-span-1 text-start pl-6">
                            <label htmlFor="gender">Giới tính</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center pl-6 gap-5">
                            <label htmlFor="male"><input type="radio" name="gender" onChange={handleInputChange} value="man" /> Nam</label>
                            <label htmlFor="female"><input type="radio" name="gender" onChange={handleInputChange} value="women" /> Nữ</label>
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="phone" className="mr-4">Số điện thoại</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <input type="phone" name="phone" onChange={handleInputChange} id="phone" className="w-full sm:w-[90%] border-b-2 px-2 py-2" placeholder="Nhập số điện thoại của bạn" />
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="email" className="mr-4">Địa chỉ email</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <input type="email" name="email" onChange={handleInputChange} id="email" className="w-full sm:w-[90%] border-b-2 px-2 py-2" placeholder="Nhập địa chỉ email của bạn" />
                        </div>

                        {/* <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="city" className="mr-4">Thành phố / Tỉnh</label>
                        </div> */}
                        {/* <div className="col-span-2 flex justify-start items-center">
                            <Select onSelect={handleSelectCity}></Select>
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="district" className="mr-4">Quận / Huyện</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <Select onSelect={handleSelectDistrict}></Select>
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="ward" className="mr-4">Phường / Xã</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <Select onSelect={handleSelectWard}></Select>
                        </div> */}

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="address" className="mr-4">Địa chỉ</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <input type="text" name="address" onChange={handleInputChange} id="address" className="w-full sm:w-[90%] border-b-2 px-2 py-2" placeholder="Nhập địa chỉ của bạn" />
                        </div>

                        <div className="col-span-3 w-full mt-10">
                            <button onSubmit={handleSubmit} className="w-full sm:w-[90%] py-2 border-2 border-blue-400 text-blue-400 rounded-xl hover:text-white hover:bg-blue-400 transition duration-300" onClick={handleSubmit}>
                                Đăng ký
                            </button>
                        </div>

                        <div className="col-span-3 flex justify-center my-4 gap-2">
                            <p>Bạn đã có tài khoản ?</p>
                            <a href="/Sign_In" className="font-bold text-blue-400">Đăng nhập</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
