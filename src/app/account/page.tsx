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
import { showErrorToast, showSuccessToast } from "@/components/Toast/toast";
import Loading from "@/components/Loading/Loading";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = Cookies.get("id");
        if (!id) throw new Error("ID người dùng không hợp lệ.");

        const response = await fetchApi(
          `/api/users/${id}`,
          HTTPMethod.GET,
          null,
          true
        );
        if (!response) throw new Error("Không thể lấy dữ liệu người dùng.");

        setUserData(response);
      } catch (err) {
        showErrorToast(
          err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định."
        );
      } finally {
        setIsLoading(false);
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
      if (result) {
        showSuccessToast("Điểm danh thành công");
      } else {
        showErrorToast("Điểm danh thất bại");
      }
      // console.log(result);
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

  const convertRole = (role: any) => {
    switch (role) {
      case "member":
        return "Tình nguyện viên";
      case "admin":
        return "Quản trị viên";
      default:
        return "Người dùng";
    }
  };
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
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
                <p className="text-lg font-medium">
                  {userData?.firstName} {userData?.lastName}
                </p>
                <p>Chức vụ: {convertRole(userData?.roles)}</p>
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
                        className={`px-4 py-2 ${
                          activeTab === tab ? "font-bold text-blue-500" : ""
                        }`}
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
      )}
    </>
  );
}
