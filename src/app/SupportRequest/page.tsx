'use client'
import Select from '@/components/ui/app.selectninput'
import fetchApi from '@/utils/fetchApi';
import { useState } from 'react';

export default function SupportReport() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
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
            const response = await fetchApi('http://localhost:8000/api/supportRequests', 'POST', formData);


            console.log('Register success:', response);

        } catch (error) {
            console.error('Register failed:', error);
        }
    };

    const handleSelectCity = (value: string) => {
        setFormData({
            ...formData,
            city: value,  // Lưu giá trị thành phố từ dropdown
        });
    };

    const handleSelectDistrict = (value: string) => {
        setFormData({
            ...formData,
            district: value,  // Lưu giá trị thành phố từ dropdown
        });
    };
    const handleSelectWard = (value: string) => {
        setFormData({
            ...formData,
            ward: value,  // Lưu giá trị thành phố từ dropdown
        });
    };

    return (
        <div className="relative z-0 py-20 w-full box-border"
            style={{
                backgroundImage: "url('/img/section-background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >

            <div  >
                <form action="" className="container mx-auto text-center ">
                    <h2 className="my-20 text-4xl font-bold">Dành cho người cần cứu nạn</h2>
                    <div className="container md:w-[50%] sm:w-[70%] mx-auto border-2 rounded-lg py-4 grid grid-cols-3" >
                        <div className="col-span-3">
                            <p className="text-xl font-semibold">Thông tin liên hệ</p>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Họ và tên đệm</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <input type="text" name='firstName' onChange={handleInputChange} className="w-[90%] border-b-2 px-2" placeholder="Nhập họ và tên đệm của bạn" />
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Tên</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <input type="text" name='lastName' onChange={handleInputChange} className="w-[90%] border-b-2 px-2" placeholder="Nhập tên của bạn" />
                        </div>
                        <div className="col-span-1 text-start pl-6 my-6">
                            <label htmlFor="">Giới tính</label>
                        </div>
                        <div className="col-span-2 my-6 flex justify-start  pl-6 gap-5">
                            <label htmlFor=""><input type="radio" name='gender' onChange={handleInputChange} value="Nam" /> Nam</label>
                            <label htmlFor=""><input type="radio" name='gender' onChange={handleInputChange} value="Nữ" /> Nữ</label>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Số điện thoại</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <input type="phone" name='phone' onChange={handleInputChange} className="w-[90%] border-b-2 px-2" placeholder="Nhập số điện thoại của bạn" />
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Địa chỉ email</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <input type="email" name='email' onChange={handleInputChange} className="w-[90%] border-b-2 px-2" placeholder="Nhập địa chỉ email của bạn" />
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Thành phố / Tỉnh</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <Select onSelect={handleSelectCity}></Select>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Quận / Huyện</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <Select onSelect={handleSelectDistrict}></Select>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Phường / Xã</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <Select onSelect={handleSelectWard}></Select>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Địa chỉ</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <input type="text" name='address' onChange={handleInputChange} className="w-[90%] border-b-2 px-2" placeholder="Nhập địa chỉ của bạn" />
                        </div>


                        <div className="col-span-3 mt-4 py-4 flex justify-center">
                            <p className="text-xl w-full font-semibold border-t-2 border-dashed pt-6">Thông tin trợ giúp</p>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Quận / Huyện</label>
                        </div>
                        {/* <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <Select></Select>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Quận / Huyện</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <Select></Select>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Quận / Huyện</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <Select></Select>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Quận / Huyện</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <Select></Select>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Quận / Huyện</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <Select></Select>
                        </div> */}

                        <div className="col-span-3 w-full mt-10">
                            <button onSubmit={handleSubmit} className="border-2 border-blue-400 delay-75 w-[90%] py-2 rounded-xl text-blue-400 hover:text-white hover:bg-blue-400">Xác Nhận</button>
                        </div>
                        <div className="col-span-3 flex justify-center my-4 gap-2">
                            <p>Liên hệ với chúng tôi qua số điện thoại</p>
                            <a href="" className="font-bold text-blue-400">0123456789</a>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
