/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use client";
import { useEffect, useState } from "react";
import AccountTab from "@/components/features/accountPage/AccountTab";
import ChangePasswordTab from "@/components/features/accountPage/ChangePasswordTab";
import UpdateAccountTab from "@/components/features/accountPage/UpdateAccountTab";
import DonationHistoryTab from "@/components/features/accountPage/DonationHistoryTab";
import SupportedHistoryTab from "@/components/features/accountPage/SupportedHistoryTab";
import WorkplanTab from "@/components/features/accountPage/WorkplanTab";
import fetchApi from "@/utils/fetchApi";
import { HTTPMethod } from "@/types/enum";
import Cookies from "js-cookie";

enum Tabs {
  PROFILE = "profile",
  UPDATE_ACCOUNT = "updateAccount",
  DONATION_HISTORY = "donationHistory",
  SUPPORTED_HISTORY = "supportedHistory",
  WORKPLAN = "workplan",
  CHANGE_PASSWORD = "changePassword",
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.PROFILE);
  const [userData, setUserData] = useState<any>(null);
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = Cookies.get("id");
        if (!id) throw new Error("ID người dùng không hợp lệ.");

        const response = await fetchApi(`/api/users/${id}`, HTTPMethod.GET, null, true);
        if (!response) throw new Error("Không thể lấy dữ liệu người dùng.");

        setUserData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        },
        (error) => {
          console.error("Lỗi Geolocation:", error.message);
        }
      );
    } else {
      console.error("Trình duyệt không hỗ trợ Geolocation API.");
    }
  }, []);

  const handleAttendance = async () => {
    try {
      const result = await fetchApi(
        `/api/users/nowLocation`,
        HTTPMethod.POST,
        { lat, long },
        true
      );
      console.log(result);
    } catch (error) {
      console.error("Lỗi điểm danh:", error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case Tabs.PROFILE:
        return <AccountTab userData={userData} />;
      case Tabs.UPDATE_ACCOUNT:
        return <UpdateAccountTab userData={userData} />;
      case Tabs.DONATION_HISTORY:
        return <DonationHistoryTab userData={userData} />;
      case Tabs.SUPPORTED_HISTORY:
        return <SupportedHistoryTab userData={userData} />;
      case Tabs.WORKPLAN:
        return <WorkplanTab userData={userData} />;
      case Tabs.CHANGE_PASSWORD:
        return <ChangePasswordTab />;
      default:
        return <AccountTab userData={userData} />;
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div className="text-red-500">Lỗi: {error}</div>;

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
            <p className="text-lg font-medium">{userData?.firstName} {userData?.lastName}</p>
            <p>Chức vụ: {userData?.roles?.join(", ") || "Tình nguyện viên"}</p>
            <button
              className="border-rose-600 border-2 rounded-lg px-4 py-2 my-2 hover:bg-red-600 hover:text-white"
              onClick={handleAttendance}
            >
              Điểm danh
            </button>
          </div>
        </div>
        <div className="col-span-4">
          <div className="mx-2 grid-row text-center items-center border-2 p-4 rounded-xl drop-shadow-md bg-white">
            <div className="border-b-2 p-4">
              <nav className="gap-4 flex justify-between">
                {Object.values(Tabs).map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 ${activeTab === tab ? "font-bold text-blue-500" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === Tabs.PROFILE && "Hồ Sơ"}
                    {tab === Tabs.UPDATE_ACCOUNT && "Thay đổi hồ sơ"}
                    {tab === Tabs.DONATION_HISTORY && "Lịch sử từ thiện"}
                    {tab === Tabs.SUPPORTED_HISTORY && "Lịch sử yêu cầu"}
                    {tab === Tabs.WORKPLAN && "Lịch sử tình nguyện"}
                    {tab === Tabs.CHANGE_PASSWORD && "Cập nhật mật khẩu"}
                  </button>
                ))}
              </nav>
            </div>
            <div className="p-4">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
