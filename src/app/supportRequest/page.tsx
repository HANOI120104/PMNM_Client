/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

"use client";
import fetchApi, { API_BASE_URL } from "@/utils/fetchApi";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { HTTPMethod } from "@/types/enum";
import useSWR from "swr";
import { showErrorToast, showSuccessToast } from "@/components/Toast/toast";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SupportReport() {
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/api/supportRequestTypes`,
    fetcher
  );

  const [userData, setUserData] = useState<any>(null);
  const [code, setCode] = useState("");
  const [formData, setFormData] = useState({
    city: "",
    descripton: "",
    detailAddress: "",
    district: "",
    email: "",
    fullname: "",
    location: {
      lat: 0,
      lng: 0,
    },
    phone: "",
    point: 0,
    quantity: 0,
    status: "Pending",
    supportRequestTypeId: "6758a1fb9a94bb18f6c54555",
    ward: "",
    // requestCode: "asassasa1",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      if (response) {
        setCode(response.requestCode);
        showSuccessToast("Tạo yêu cầu thành công");
      }
      console.log("Register success:", response);
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  const [coordinates, setCoordinates] = useState<string>(""); // To hold coordinates message
  const [buttonText, setButtonText] = useState(""); // Button text state

  const getCurrentCoordinates = (e: any) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setFormData({
            ...formData,
            location: {
              lat: lat,
              lng: lon,
            },
          });
          setButtonText(`Tọa độ: ${lat.toFixed(4)}, ${lon.toFixed(4)}`); // Update button text with coordinates
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

  useEffect(() => {
    const id = Cookies.get("id");
    const token = Cookies.get("access_token");
    if (id && token) {
      const fetchUserData = async () => {
        try {
          const response = await fetchApi(
            `/api/users/${id}`,
            HTTPMethod.GET,
            null,
            true
          );
          if (!response) throw new Error("Không thể lấy dữ liệu người dùng.");

          setUserData(response);

          setFormData({
            ...formData,
            city: response?.address?.city,
            district: response?.address?.district,
            ward: response?.address?.ward,
            fullname: `${response?.firstName} ${response?.lastName}`,
            phone: response?.phone,
            email: response?.email,
          });
        } catch (err) {
          showErrorToast("Đã xảy ra lỗi không xác định");
        }
      };

      fetchUserData();
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load data</div>;
  }
  return (
    <>
      {isLoading ? (
        <div>Loading..........</div>
      ) : (
        <div
          className="relative z-0 py-20 w-full box-border"
          style={{
            backgroundImage: "url('/img/section-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <div className="container mx-auto text-center">
              <h2 className="my-20 text-4xl font-bold">
                Dành cho người cần cứu nạn
              </h2>
              {code && (
                <div className="mt-6">
                  <p className="text-xl font-semibold">
                    Mã tra cứu của bạn là: {code} vui lòng lưu lại!
                  </p>
                </div>
              )}
              <div className="container md:w-[50%] sm:w-[70%] mx-auto border-2 rounded-lg py-4 grid grid-cols-3">
                {/* Thông tin liên hệ */}
                <div className="col-span-3">
                  <p className="text-xl font-semibold">Thông tin liên hệ</p>
                </div>

                {/* Họ và tên */}
                <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                  <label htmlFor="fullname" className="mr-4">
                    Họ và tên
                  </label>
                </div>
                <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className="w-[90%] border-b-2 px-2"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>

                {/* Số điện thoại */}
                <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                  <label htmlFor="phone" className="mr-4">
                    Số điện thoại
                  </label>
                </div>
                <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                  <input
                    type="phone"
                    name="phone"
                    onChange={handleInputChange}
                    value={userData?.phone}
                    className="w-[90%] border-b-2 px-2"
                    placeholder="Nhập số điện thoại của bạn"
                  />
                </div>

                {/* Địa chỉ email */}
                <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                  <label htmlFor="email" className="mr-4">
                    Địa chỉ email
                  </label>
                </div>
                <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                  <input
                    type="email"
                    name="email"
                    value={userData?.email || ""}
                    onChange={handleInputChange}
                    className="w-[90%] border-b-2 px-2"
                    placeholder="Nhập địa chỉ email của bạn"
                  />
                </div>

                {/* Thành phố / Tỉnh */}
                <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                  <label htmlFor="city" className="mr-4">
                    Thành phố / Tỉnh
                  </label>
                </div>
                <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                  <input
                    type="text"
                    name="city"
                    onChange={handleInputChange}
                    value={userData?.address?.city || ""}
                    className="w-[90%] border-b-2 px-2"
                    placeholder="Nhập thành phố bạn ở"
                  />
                </div>

                {/* Quận / Huyện */}
                <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                  <label htmlFor="district" className="mr-4">
                    Quận / Huyện
                  </label>
                </div>
                <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                  <input
                    type="text"
                    name="district"
                    value={userData?.address?.district || ""}
                    onChange={handleInputChange}
                    className="w-[90%] border-b-2 px-2"
                    placeholder="Nhập quận bạn đang ở"
                  />
                </div>

                {/* Phường / Xã */}
                <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                  <label htmlFor="ward" className="mr-4">
                    Phường / Xã
                  </label>
                </div>
                <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                  <input
                    type="text"
                    name="ward"
                    onChange={handleInputChange}
                    value={userData?.address?.ward || ""}
                    className="w-[90%] border-b-2 px-2"
                    placeholder="Nhập phường bạn đang ở"
                  />
                </div>

                {/* Địa chỉ */}
                <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                  <label htmlFor="detailAddress" className="mr-4">
                    Địa chỉ
                  </label>
                </div>
                <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                  <input
                    type="text"
                    name="detailAddress"
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
                  <label htmlFor="supportRequestTypeId" className="mr-4">
                    Loại cứu trợ
                  </label>
                </div>
                <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                  <select
                    name="supportRequestTypeId"
                    //   onChange={handleInputChange} // Thêm sự kiện onChange để xử lý giá trị chọn
                    className="w-[90%] border-b-2 px-2"
                  >
                    <option value="" disabled selected>
                      Chọn loại cứu trợ
                    </option>
                    {data?.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mô tả */}
                <div className="col-span-1 w-[100%] my-6 flex justify-start items-start pl-6">
                  <label htmlFor="descripton" className="mr-4">
                    Mô tả
                  </label>
                </div>
                <div className="col-span-2 w-[100%] my-6 flex justify-start items-start">
                  <textarea
                    name="descripton"
                    onChange={handleInputChange}
                    className="w-[90%] border-b-2 px-2"
                    placeholder="Nhập mô tả về yêu cầu cứu trợ"
                    rows={4}
                  />
                </div>
                {buttonText && <div>{buttonText}</div>}
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
                {/* <Location></Location> */}

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
      )}
    </>
  );
}
