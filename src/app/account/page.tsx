/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

"use client";
import { useEffect, useState } from "react";
import AccountTab from "@/components/features/accountPage/AccountTab";
import ChangePasswordTab from "@/components/features/accountPage/ChangePasswordTab";
import UpdateAccountTab from "@/components/features/accountPage/UpdateAccountTab";
import DonationHistoryTab from "@/components/features/accountPage/DonationHistoryTab";
import SupportedHistoryTab from "@/components/features/accountPage/SupportedHistoryTab";
import fetchApi from "@/utils/fetchApi";
import { HTTPMethod } from "@/types/enum";
import Cookies from "js-cookie";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile"); // Default tab
  const [userData, setUserData] = useState<any>(null); // State để lưu dữ liệu người dùng
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  const attendance = () => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = Cookies.get("id");
        const response = await fetchApi(
          `/api/users/${id}`,
          HTTPMethod.GET,
          null,
          true
        ); // Thay URL bằng API của bạn
        if (!response) {
          throw new Error("Failed to fetch data");
        }
        const data = await response;
        setUserData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // Lỗi được ép kiểu thành Error, có thể sử dụng message
        } else {
          setError("Đã xảy ra lỗi không xác định");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await fetchApi(
        `/api/users/nowLocation`,
        HTTPMethod.POST,
        {
          lat,
          long,
        },
        true
      );
      console.log(result);
      return;
    } catch (error) {}
  };
  // Function to render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <AccountTab userData={userData} />;
      case "updateAccount":
        return <UpdateAccountTab userData={userData} />;
      case "donationHistory":
        return <DonationHistoryTab />;
      case "supportedHistory":
        return <SupportedHistoryTab />;
      case "changePassword":
        return <ChangePasswordTab />;
      default:
        return <AccountTab userData={userData} />;
    }
  }
  useEffect(() => {
    // Kiểm tra nếu trình duyệt hỗ trợ Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLat(lat);
          setLong(lon);
        },
        (error) => {
          // Xử lý lỗi
          //   switch (error.code) {
          //     case error.PERMISSION_DENIED:
          //       setError("Người dùng từ chối truy cập vị trí.");
          //       break;
          //     case error.POSITION_UNAVAILABLE:
          //       setError("Thông tin vị trí không khả dụng.");
          //       break;
          //     case error.TIMEOUT:
          //       setError("Yêu cầu lấy vị trí bị hết thời gian.");
          //       break;
          //     default:
          //       setError("Đã xảy ra lỗi không xác định.");
          //       break;
          //   }
          console.error("Lỗi:", error.message);
        }
      );
    } else {
      //   setError("Trình duyệt không hỗ trợ Geolocation.");
      console.error("Trình duyệt không hỗ trợ Geolocation API.");
    }
  }, []);
  return (
    <div
      className="relative z-0 py-20 w-full box-border"
      style={{
        backgroundImage: "url('/img/section-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container py-20 mx-auto text-center grid grid-cols-6">
        <div className="col-span-2">
          <div className="mx-2 grid-row text-center items-center border-2 p-4 rounded-xl drop-shadow-md bg-white">
            <div className="flex justify-center">
              <img
                className="w-24 h-24 object-cover border-2 rounded-full my-2"
                src="/img/icons8-user-100.png"
                alt="Profile"
              />
            </div>
            <p className="text-lg font-medium">Phạm Nhật Anh</p>
            <p>Chức vụ: Tình nguyện viên</p>
            <button
              className="border-rose-600 border-2 rounded-lg px-4 py-2 my-2 hover:bg-red-600 hover:text-white"
              onClick={fetchData}
            >
              Điểm danh
            </button>
          </div>
        </div>
        <div className="col-span-4">
          <div className="mx-2 grid-row text-center items-center border-2 p-4 rounded-xl drop-shadow-md bg-white">
            <div className="border-b-2 p-4">
              <nav className="gap-4 flex justify-between">
                <button
                  className={`px-4 py-2 ${
                    activeTab === "profile" ? "font-bold text-blue-500" : ""
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  Hồ Sơ
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeTab === "updateAccount"
                      ? "font-bold text-blue-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("updateAccount")}
                >
                  Thay đổi hồ sơ
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeTab === "donationHistory"
                      ? "font-bold text-blue-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("donationHistory")}
                >
                  Lịch sử từ thiện
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeTab === "supportedHistory"
                      ? "font-bold text-blue-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("supportedHistory")}
                >
                  Lịch sử yêu cầu
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeTab === "changePassword"
                      ? "font-bold text-blue-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("changePassword")}
                >
                  Cập nhật mật khẩu
                </button>
              </nav>
            </div>
            <div className="p-4">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
