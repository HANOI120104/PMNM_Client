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
import Cookies from "js-cookie";
import Location from '@/components/features/supportedRequest/loaction'


export default function DonationDetail() {
    const [formData, setFormData] = useState({
        accountNumber: "string",
        amount: 0,
        bank: "string",
        city: "string",

        description: "string",
        detailAddress: "string",
        district: "string",
        email: "string",
        fullName: "string",
        id: "string",
        paymentMethod: "CreditCard",
        phone: "string",
        status: "Pending",
        supportRequestTypeId: "string",
        supportRequestTypeName: "string",


        ward: "string"
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
        const getCookie = Cookies.get('access_token')
        try {
            const response = await fetchApi(`http://localhost:8000/api/users/${getCookie}`, 'GET', formData);
            console.log('Register success:', response);

        } catch (error) {
            console.error('Register failed:', error);
        }
    };

    const [coordinates, setCoordinates] = useState<string>('');  // Sử dụng useState để lưu trữ thông tin tọa độ

    const getCurrentCoordinates = () => {
        // Kiểm tra nếu trình duyệt hỗ trợ Geolocation API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setCoordinates(`Latitude: ${lat}, Longitude: ${lon}`);
                    console.log("Latitude:", lat);
                    console.log("Longitude:", lon);
                },
                (error: GeolocationPositionError) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            setCoordinates("Người dùng từ chối truy cập vị trí.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            setCoordinates("Thông tin vị trí không khả dụng.");
                            break;
                        case error.TIMEOUT:
                            setCoordinates("Yêu cầu lấy vị trí bị hết thời gian.");
                            break;
                        default:
                            setCoordinates("Đã xảy ra lỗi không xác định.");
                            break;
                    }
                    console.error("Lỗi:", error.message);
                }
            );
        } else {
            setCoordinates("Trình duyệt không hỗ trợ Geolocation.");
            console.error("Trình duyệt không hỗ trợ Geolocation API.");
        }
    };

    return (
        <div className="relative z-0 w-full box-border "
            style={{
                backgroundImage: "url('/img/section-background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
            <div className="container mx-auto py-20 text-center px-4" >
                <form action="">
                    <h2 className="my-20 text-4xl font-bold">Dành cho mạnh thường quân - Ủng hộ </h2>
                    <div className="container md:w-[50%] sm:[80%] mx-auto border-2 rounded-lg py-4 grid grid-cols-3 p-10" >
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Họ và tên</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <input type="text" className="w-[90%] border-b-2 px-2" placeholder="Nhập họ và tên của bạn" name="fullName" />
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Số điện thoại</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <input type="text" className="border-b-2 w-[90%] border-b-2 px-2" placeholder="Nhập số điện thoại" name="phone" />
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Thành Phố/Tỉnh</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <select name="" id="" className="border-b-2 w-[90%] border-b-2 px-2">
                                <option value="city">Hà Nội</option>
                            </select>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Quận/Huyện</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <select name="district" id="" className="border-b-2 w-[90%] border-b-2 px-2">
                                <option value="">Đống Đa</option>
                            </select>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Phường/Xã</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <select name="ward" id="" className="border-b-2 w-[90%] border-b-2 px-2">
                                <option value="">Thổ Quan</option>
                            </select>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Loại</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <select name="typeSupply" id="" className="border-b-2 w-[90%] border-b-2 px-2">
                                <option value="money">Tiền</option>
                                <option value="goods">Vật tư</option>
                            </select>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Số lượng</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <select name="typeSupply" id="" className="border-b-2 w-[90%] border-b-2 px-2">
                                <option value="money">Tiền</option>
                                <option value="goods">Vật tư</option>
                            </select>
                        </div>
                        <div className="col-span-3 w-full mt-10">
                            <button className="border-2 border-blue-400 delay-75 w-[90%] py-2 rounded-xl text-blue-400 hover:text-white hover:bg-blue-400">Xác nhận</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}