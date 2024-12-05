'use client'
import Select from '@/components/app.selectninput'
import fetchApi from '@/utils/fetchApi';
import { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
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
            const response = await fetchApi('/api/register', 'POST', formData);

            console.log('Register success:', response);

        } catch (error) {
            console.error('Register failed:', error);
        }
    };

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
                            <input type="password" id="password" className="w-full sm:w-[90%] border-b-2 px-2 py-2" placeholder="Nhập mật khẩu của bạn" />
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="confirm-password" className="mr-4">Xác nhận mật khẩu</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <input type="password" id="confirm-password" className="w-full sm:w-[90%] border-b-2 px-2 py-2" placeholder="Nhập mật khẩu xác nhận của bạn" />
                        </div>

                        <div className="col-span-3 mt-4 py-4 flex justify-center">
                            <p className="text-xl w-full font-semibold border-t-2 border-dashed pt-6">Thông tin cá nhân</p>
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="full-name" className="mr-4">Họ và tên đệm</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <input type="text" id="full-name" className="w-full sm:w-[90%] border-b-2 px-2 py-2" placeholder="Nhập họ và tên đệm của bạn" />
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="name" className="mr-4">Tên</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <input type="text" id="name" className="w-full sm:w-[90%] border-b-2 px-2 py-2" placeholder="Nhập tên của bạn" />
                        </div>

                        <div className="col-span-1 text-start pl-6">
                            <label htmlFor="gender">Giới tính</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center pl-6 gap-5">
                            <label htmlFor="male"><input type="radio" name="gender" value="Nam" /> Nam</label>
                            <label htmlFor="female"><input type="radio" name="gender" value="Nữ" /> Nữ</label>
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="phone" className="mr-4">Số điện thoại</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <input type="phone" id="phone" className="w-full sm:w-[90%] border-b-2 px-2 py-2" placeholder="Nhập số điện thoại của bạn" />
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="email" className="mr-4">Địa chỉ email</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <input type="email" id="email" className="w-full sm:w-[90%] border-b-2 px-2 py-2" placeholder="Nhập địa chỉ email của bạn" />
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="city" className="mr-4">Thành phố / Tỉnh</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <Select ></Select>
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="district" className="mr-4">Quận / Huyện</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <Select ></Select>
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="ward" className="mr-4">Phường / Xã</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <Select ></Select>
                        </div>

                        <div className="col-span-1 flex justify-start items-center pl-6">
                            <label htmlFor="address" className="mr-4">Địa chỉ</label>
                        </div>
                        <div className="col-span-2 flex justify-start items-center">
                            <input type="text" id="address" className="w-full sm:w-[90%] border-b-2 px-2 py-2" placeholder="Nhập địa chỉ của bạn" />
                        </div>

                        <div className="col-span-3 w-full mt-10">
                            <button className="w-full sm:w-[90%] py-2 border-2 border-blue-400 text-blue-400 rounded-xl hover:text-white hover:bg-blue-400 transition duration-300" onClick={handleSubmit}>
                                Đăng ký
                            </button>
                        </div>

                        <div className="col-span-3 flex justify-center my-4 gap-2">
                            <p>Bạn đã có tài khoản ?</p>
                            <a href="" className="font-bold text-blue-400">Đăng nhập</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
