/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import fetchApi from "@/utils/fetchApi";
import { HTTPMethod } from "@/types/enum";

export default function Donation() {
  const [listType, setListType] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [userDetail, setUserDetail] = useState({
    fullName: "",
    phone: "",
    city: "",
    ward: "",
    district: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchApi(
          `/api/supportRequestTypes`,
          HTTPMethod.GET
        );
        setListType(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const id = Cookies.get("id");
    if (id) {
      const getUser = async (id: string) => {
        const response = await fetchApi(
          `/api/users/${id}`,
          HTTPMethod.GET,
          null,
          true
        );
        if (response) {
          setUserDetail({
            fullName: `${response?.firstName} ${response?.lastName}`,
            city: response?.address?.city || "",
            district: response?.address?.district || "",
            ward: response?.address?.ward || "",
            phone: response?.phone || "",
          });
        }
      };
      getUser(id);
    }
  }, []);

  const handleCreate = async () => {
    try {
      if (selectType === "Tiền") {
        const payload = {
          description,
          amount,
          phone: userDetail.phone,
          fullName: userDetail.fullName,
          city: userDetail.city,
          district: userDetail.district,
          ward: userDetail.ward,
        };
        const urlPay = await fetchApi(
          `/api/donations/createdVNPAY`,
          HTTPMethod.POST,
          payload
        );
        if(urlPay.data){
          window.location.href = urlPay.data;
          return;
        }
        return;
      }

      const payload = {
        ...userDetail,
        description,
        status: "Pending",
        supportRequestTypeName: selectType,
      };

      const result = await fetchApi(
        `/api/donations/addDonation`,
        HTTPMethod.POST,
        payload
      );

      // console.log(result);
    } catch (error) {
      console.log(error);
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
        <form action="">
          <h2 className="my-12 text-4xl font-semibold text-white">
            Dành cho mạnh thường quân - Ủng hộ{" "}
          </h2>
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <label
                  htmlFor="fullName"
                  className="mr-4 text-lg text-gray-700"
                >
                  Họ và tên
                </label>
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={userDetail.fullName}
                  onChange={(e) =>
                    setUserDetail({
                      ...userDetail,
                      fullName: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>

              <div className="flex items-center">
                <label htmlFor="phone" className="mr-4 text-lg text-gray-700">
                  Số điện thoại
                </label>
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  id="phone"
                  value={userDetail.phone}
                  onChange={(e) =>
                    setUserDetail({
                      ...userDetail,
                      phone: e.target.value,
                    })
                  }
                  name="phone"
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div className="flex items-center">
                <label htmlFor="city" className="mr-4 text-lg text-gray-700">
                  Thành Phố/Tỉnh
                </label>
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={userDetail.city}
                  onChange={(e) =>
                    setUserDetail({
                      ...userDetail,
                      city: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Nhập thành phố"
                />
              </div>

              <div className="flex items-center">
                <label
                  htmlFor="district"
                  className="mr-4 text-lg text-gray-700"
                >
                  Quận/Huyện
                </label>
              </div>
              <div className="col-span-2">
          
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={userDetail.district}
                  onChange={(e) =>
                    setUserDetail({
                      ...userDetail,
                      district: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Nhập quận/huyện"
                />
              </div>

              <div className="flex items-center">
                <label htmlFor="ward" className="mr-4 text-lg text-gray-700">
                  Phường/Xã
                </label>
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  id="ward"
                  name="ward"
                  value={userDetail.ward}
                  onChange={(e) =>
                    setUserDetail({
                      ...userDetail,
                      ward: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Nhập quận/huyện"
                />
              </div>

              <div className="flex items-center">
                <label
                  htmlFor="typeSupply"
                  className="mr-4 text-lg text-gray-700"
                >
                  Loại
                </label>
              </div>
              <div className="col-span-2">
                <select
                  name="typeSupply"
                  id="typeSupply"
                  onChange={(e) => setSelectType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option selected>Chọn loại ủng hộ</option>
                  <option value="Tiền">Ủng hộ Tiền</option>
                  <option value="Vật phẩm">Ủng hộ Vật phẩm</option>

                  {/* {listType?.map((item: any) => {
                    return (
                      <option value={`${item.id}/${item.name}`}>
                        {item.name}
                      </option>
                    );
                  })} */}
                </select>
              </div>
              {selectType === "Tiền" && (
                <>
                  <div className="flex items-center">
                    <label
                      htmlFor="ward"
                      className="mr-4 text-lg text-gray-700"
                    >
                      Số tiền
                    </label>
                  </div>
                  <div className="col-span-2">
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    ></input>
                    <small className="block text-gray-500 mt-2 text-start">
                      Ghi chú: Vui lòng nhập số tiền ủng hộ rồi mới bấm xác nhận
                    </small>
                  </div>
                </>
              )}

              <div className="flex items-center">
                <label htmlFor="ward" className="mr-4 text-lg text-gray-700">
                  Mô tả
                </label>
              </div>
              <div className="col-span-2">
                <textarea
                  id="description"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  rows={6}
                ></textarea>
                <small className="block text-gray-500 mt-2 text-start">
                  Ghi chú: Nếu chọn thuốc hoặc thực phẩm vui lòng nhập chi tiết
                  các vật phẩm
                </small>
              </div>

              <div className="col-span-3 mt-8">
                <button
                  type="button"
                  className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={handleCreate}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
