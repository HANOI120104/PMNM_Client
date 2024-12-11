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
import { showErrorToast, showSuccessToast } from "@/components/Toast/toast";
import Loading from "@/components/Loading/Loading";
interface DonationPayload {
  description: string;
  amount?: number;
  phone: string;
  fullName: string;
  city: string;
  district: string;
  ward: string;
  userId?: string;
  status?: string;
  supportRequestTypeName?: string; // Make userId optional
}

export default function Donation() {
  const [listType, setListType] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState({
    fullName: "",
    phone: "",
    city: "",
    ward: "",
    district: "",
  });
  const [code, setCode] = useState("");

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
    const token = Cookies.get("access_token");
    console.log("🚀 ~ useEffect ~ token:", token);

    if (id && token !== undefined) {
      console.log("sao vao day r");
      const getUser = async (id: string) => {
        try {
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
        } catch (error) {
          showErrorToast("error");
        } finally {
          setIsLoading(false);
        }
      };
      getUser(id);
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleCreate = async () => {
    try {
      const id = Cookies.get("id");
      const token = Cookies.get("access_token");

      if (selectType === "Tiền") {
        const payload: DonationPayload = {
          description,
          amount,
          phone: userDetail.phone,
          fullName: userDetail.fullName,
          city: userDetail.city,
          district: userDetail.district,
          ward: userDetail.ward,
        };

        if (id) {
          payload.userId = id;
        }

        const urlPay = await fetchApi(
          `/api/donations/createdVNPAY`,
          HTTPMethod.POST,
          payload
        );

        if (urlPay.data) {
          window.location.href = urlPay.data;
          return;
        }
        return;
      }

      const payload: DonationPayload = {
        ...userDetail,
        description,
        status: "Pending",
        supportRequestTypeName: selectType,
      };

      if (id) {
        payload.userId = id;
      }

      const result = await fetchApi(
        `/api/donations/addDonation`,
        HTTPMethod.POST,
        payload
      );

      showSuccessToast("Tạo đơn ủng hộ thành công!");
      setCode(result.donationCode);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className="relative z-0 w-full box-border"
          style={{
            backgroundImage: "url('/img/section-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto py-20 text-center px-4">
            <h2 className="my-12 text-4xl font-semibold">
              Dành cho mạnh thường quân - Ủng hộ
            </h2>
            {code && (
              <div className="mt-6">
                <p className="text-xl font-semibold">
                  Mã tra cứu của bạn là: {code} vui lòng lưu lại!
                </p>
              </div>
            )}
            <form action="">
              <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-8">
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Full Name */}
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

                  {/* Phone */}
                  <div className="flex items-center">
                    <label
                      htmlFor="phone"
                      className="mr-4 text-lg text-gray-700"
                    >
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

                  {/* City */}
                  <div className="flex items-center">
                    <label
                      htmlFor="city"
                      className="mr-4 text-lg text-gray-700"
                    >
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

                  {/* District */}
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

                  {/* Ward */}
                  <div className="flex items-center">
                    <label
                      htmlFor="ward"
                      className="mr-4 text-lg text-gray-700"
                    >
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
                      placeholder="Nhập phường/xã"
                    />
                  </div>

                  {/* Type Supply */}
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
                    </select>
                  </div>

                  {/* Amount (Only when "Tiền" is selected) */}
                  {selectType === "Tiền" && (
                    <>
                      <div className="flex items-center">
                        <label
                          htmlFor="amount"
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
                        />
                        <small className="block text-gray-500 mt-2 text-start">
                          Ghi chú: Vui lòng nhập số tiền ủng hộ rồi mới bấm xác
                          nhận
                        </small>
                      </div>
                    </>
                  )}

                  {/* Description */}
                  <div className="flex items-center">
                    <label
                      htmlFor="description"
                      className="mr-4 text-lg text-gray-700"
                    >
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
                      Ghi chú: Nếu chọn thuốc hoặc thực phẩm vui lòng nhập chi
                      tiết các vật phẩm
                    </small>
                  </div>

                  {/* Submit Button */}
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
      )}
    </>
  );
}
