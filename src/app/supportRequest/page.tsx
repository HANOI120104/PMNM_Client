/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

"use client";
import Select from "@/components/ui/app.selectninput";
import fetchApi, { API_BASE_URL } from "@/utils/fetchApi";
import { useState } from "react";
import Cookies from "js-cookie";
import Location from "@/components/features/supportedRequest/loaction";
import { HTTPMethod } from "@/types/enum";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SupportReport() {
  //   const [listType, setListType] = useState([]);
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/api/supportRequestTypes`,
    fetcher
  );

  const [formData, setFormData] = useState({
    city: "string",
    descripton: "string",
    detailAddress: "string",
    district: "string",
    email: "string",
    fullname: "string",
    location: {
      lat: 0,
      lng: 0,
    },
    phone: "string",
    point: 0,
    quantity: 0,
    status: "Pending",
    supportRequestTypeId: "6758a1fb9a94bb18f6c54555",
    ward: "string",
    // requestCode: "asassasa1",
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
      const response = await fetchApi(
        "/api/supportRequests/addSupportRequest",
        HTTPMethod.POST,
        formData
      );
      console.log("Register success:", response);
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  const [coordinates, setCoordinates] = useState<string>(""); // Sử dụng useState để lưu trữ thông tin tọa độ

  const getCurrentCoordinates = (e) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log("🚀 ~ getCurrentCoordinates ~ lon:", lon)
          console.log("🚀 ~ getCurrentCoordinates ~ lat:", lat)
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


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load data</div>;
  }

  return (
    isLoading ? <div>Loading......</div> : (
      <div
        className="relative z-0 py-20 w-full box-border"
        style={{
          backgroundImage: "url('/img/section-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <div  className="container mx-auto text-center">
            <h2 className="my-20 text-4xl font-bold">Dành cho người cần cứu nạn</h2>
            <div className="container md:w-[50%] sm:w-[70%] mx-auto border-2 rounded-lg py-4 grid grid-cols-3">
              {/* Thông tin liên hệ */}
              <div className="col-span-3">
                <p className="text-xl font-semibold">Thông tin liên hệ</p>
              </div>
  
              {/* Họ và tên */}
              <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                <label htmlFor="fullName" className="mr-4">Họ và tên</label>
              </div>
              <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                <input
                  type="text"
                  name="fullName"
                  onChange={handleInputChange}
                  className="w-[90%] border-b-2 px-2"
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>
  
              {/* Số điện thoại */}
              <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                <label htmlFor="phone" className="mr-4">Số điện thoại</label>
              </div>
              <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                <input
                  type="phone"
                  name="phone"
                  onChange={handleInputChange}
                  className="w-[90%] border-b-2 px-2"
                  placeholder="Nhập số điện thoại của bạn"
                />
              </div>
  
              {/* Địa chỉ email */}
              <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                <label htmlFor="email" className="mr-4">Địa chỉ email</label>
              </div>
              <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  className="w-[90%] border-b-2 px-2"
                  placeholder="Nhập địa chỉ email của bạn"
                />
              </div>
  
              {/* Thành phố / Tỉnh */}
              <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                <label htmlFor="city" className="mr-4">Thành phố / Tỉnh</label>
              </div>
              <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                <input
                  type="text"
                  name="city"
                  onChange={handleInputChange}
                  className="w-[90%] border-b-2 px-2"
                  placeholder="Nhập thành phố bạn ở"
                />
              </div>
  
              {/* Quận / Huyện */}
              <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                <label htmlFor="district" className="mr-4">Quận / Huyện</label>
              </div>
              <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                <input
                  type="text"
                  name="district"
                  onChange={handleInputChange}
                  className="w-[90%] border-b-2 px-2"
                  placeholder="Nhập quận bạn đang ở"
                />
              </div>
  
              {/* Phường / Xã */}
              <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                <label htmlFor="ward" className="mr-4">Phường / Xã</label>
              </div>
              <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                <input
                  type="text"
                  name="ward"
                  onChange={handleInputChange}
                  className="w-[90%] border-b-2 px-2"
                  placeholder="Nhập phường bạn đang ở"
                />
              </div>
  
              {/* Địa chỉ */}
              <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                <label htmlFor="address" className="mr-4">Địa chỉ</label>
              </div>
              <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                <input
                  type="text"
                  name="address"
                  onChange={handleInputChange}
                  className="w-[90%] border-b-2 px-2"
                  placeholder="Nhập địa chỉ của bạn"
                />
              </div>
  
              {/* Thông tin trợ giúp */}
              <div className="col-span-3 mt-4 py-4 flex justify-center">
                <p className="text-xl w-full font-semibold border-t-2 border-dashed pt-6">
                  Thông tin trợ giúp
                </p>
              </div>
  
              {/* Loại cứu trợ */}
              <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                <label htmlFor="supportRequestTypeId" className="mr-4">Loại cứu trợ</label>
              </div>
              <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                <select
                  name="supportRequestTypeId"
                //   onChange={handleInputChange} // Thêm sự kiện onChange để xử lý giá trị chọn
                  className="w-[90%] border-b-2 px-2"
                  placeholder="Chọn loại cứu trợ"
                >
                  <option value="" disabled selected>Chọn loại cứu trợ</option>
                  {data?.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
  
              {/* Số lượng */}
              {/* <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                <label htmlFor="quantity" className="mr-4">Số lượng</label>
              </div>
              <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                <input
                  type="text"
                  name="quantity"
                  onChange={handleInputChange}
                  className="w-[90%] border-b-2 px-2"
                  placeholder="Nhập số lượng bạn cần"
                />
              </div> */}
  
              {/* Mô tả */}
              <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                <label htmlFor="description" className="mr-4">Mô tả</label>
              </div>
              <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                <textarea
                  type="text"
                  name="description"
                  onChange={handleInputChange}
                  className="w-[90%] border-b-2 px-2"
                  placeholder="Nhập mô tả về yêu cầu cứu trợ"
                  rows={4} 
                />
              </div>
  
              {/* Nút lấy tọa độ */}
              <div className="col-span-3 w-full mt-10">
                <button
                  onClick={getCurrentCoordinates}
                  className="border-2 border-blue-400 delay-75 w-[90%] py-2 rounded-xl text-blue-400 hover:text-white hover:bg-blue-400"
                >
                  Lấy toạ độ
                </button>
              </div>
  
              {/* Nút xác nhận */}
              <div className="col-span-3 w-full mt-10">
                <button
                  onClick={handleSubmit}
                  className="border-2 border-blue-400 delay-75 w-[90%] py-2 rounded-xl text-blue-400 hover:text-white hover:bg-blue-400"
                >
                  Xác Nhận
                </button>
              </div>
  
              {/* Hiển thị thông tin tọa độ */}
              <Location></Location>
  
              {/* Liên hệ */}
              <div className="col-span-3 flex justify-center my-4 gap-2">
                <p>Liên hệ với chúng tôi qua số điện thoại</p>
                <a href="tel:0123456789" className="font-bold text-blue-400">
                  0123456789
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
  
}
