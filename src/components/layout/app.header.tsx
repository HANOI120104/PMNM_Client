"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import fetchApi from "@/utils/fetchApi";
import { HTTPMethod } from "@/types/enum";
import { read } from "fs";
// import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getApp, getApps, initializeApp } from "firebase/app";
import { showSuccessToast } from "../Toast/toast";
import { useRouter } from "next/navigation";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([]); // Dữ liệu thông báo
  const [unreadCount, setUnreadCount] = useState(0); // Số lượng thông báo chưa đọc
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Trạng thái mở thông báo
  const [isRinging, setIsRinging] = useState(false); // Trạng thái chuông đổ
  const token = Cookies.get("access_token");
  const notificationRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);
  const fetchNoti = async () => {
    try {
      const data = await fetchApi(
        `/api/fcms/byUser`,
        HTTPMethod.GET,
        false,
        true
      );
      if (data) {
        const unreadNotifications = data.filter(
          (item: any) => item.read === "false"
        );

        setNotifications(data);
        setUnreadCount(unreadNotifications.length);
      }
      return data;
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    try {
      const id = Cookies.get("id");
      const token = Cookies.get("access_token");
      if (id && token) fetchNoti();
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    try {
      // Initialize Firebase only if not already initialized
      const app =
        getApps()?.length === 0
          ? initializeApp({
              apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
              authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
              projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
              storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
              messagingSenderId:
                process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
              appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
            })
          : getApp(); // Get existing app if already initialized
      const messaging = getMessaging(app); // Initialize messaging service

      const unsubscribe = onMessage(messaging, (payload) => {
        const payLoadNew = JSON.parse(payload.notification?.body!);
        // Sử dụng updater function để cập nhật state
        setNotifications((prev) => [...prev, payLoadNew]);

        // Cập nhật số lượng thông báo chưa đọc
        setUnreadCount((prev) => prev + 1);
      });

      return () => {
        unsubscribe(); // Unsubscribe from the listener when the component is unmounted
      };
    } catch (error) {}
  }, []);

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleClickItemNoti = async (id: string) => {
    try {
      const notification = notifications.find((item: any) => item.id === id);
      if (notification && (notification as any).read === "true") {
        return;
      }
      const result = await fetchApi(
        `/api/fcms/${id}`,
        HTTPMethod.PATCH,
        {
          // id: id,
          read: "true",
        },
        true
      );
      await fetchNoti();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    setIsLoggedIn(false);
    showSuccessToast("Bạn đã đăng xuất!");
    router.push("/signin");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false); // Đóng danh sách thông báo
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-blue-400 border-b-2 py-4">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img src="img/logo.png" alt="Logo" className="object-cover h-16" />
            <h2 className="text-4xl font-bold ml-2 delay-100 hover:text-[#E53634] md:block">
              ATA
            </h2>
          </Link>
        </div>

        {/* Menu cho laptop */}
        <nav className="hidden md:flex gap-10 items-center">
          <Link
            href="/searchSupported"
            className="font-bold text-black hover:text-[#E53634]  hover:border-[#E53634]"
          >
            Tra cứu yêu cầu hỗ trợ
          </Link>
          <Link
            href="/searchPage"
            className="font-bold text-black hover:text-[#E53634]  hover:border-[#E53634]"
          >
            Tra cứu ủng hộ
          </Link>
          <Link
            href="/signup"
            className="font-bold text-black hover:text-[#E53634]  hover:border-[#E53634]"
          >
            Đăng ký thành viên
          </Link>
          <Link
            href="/donation"
            className="font-bold text-black hover:text-[#E53634]  hover:border-[#E53634]"
          >
            Ủng hộ
          </Link>
          <Link
            href="/supportRequest"
            className="font-bold text-white bg-[#E53634] px-8 py-4 rounded-md hover:bg-blue-800"
          >
            Tôi cần giúp đỡ
          </Link>
          {!isLoggedIn ? (
            <>
              <Link
                href="/signin"
                className="font-bold text-black hover:text-[#E53634]  hover:border-[#E53634]"
              >
                Đăng nhập
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/account"
                className="font-bold text-black hover:text-[#E53634]  hover:border-[#E53634]"
              >
                Tài khoản
              </Link>
              <button
                onClick={handleLogout}
                className="font-bold text-black hover:text-[#E53634]  hover:border-[#E53634]"
              >
                Đăng xuất
              </button>

              {/* Icon chuông thông báo */}
              <div className="relative ml-4" ref={notificationRef}>
                <button
                  onClick={handleNotificationClick}
                  className={`relative text-gray-700 w-8 h-8 flex items-center justify-center ${
                    isRinging ? "animate-ring" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.006 2.006 0 0118 14V9a7.003 7.003 0 00-6-6.917V2a1 1 0 10-2 0v.083A7.003 7.003 0 006 9v5c0 .533-.214 1.042-.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Danh sách thông báo */}
                {isNotificationOpen && (
                  <div className="absolute right-0 top-12 bg-white border border-gray-300 rounded-lg shadow-lg w-64 py-2 max-h-64 overflow-y-auto custom-scrollbar">
                    <div className="px-4 py-2 text-gray-700 font-bold">
                      Thông báo
                    </div>
                    <ul className="space-y-2">
                      {notifications.length === 0 ? (
                        <li className="px-4 py-2 text-sm text-gray-500">
                          Không có thông báo nào.
                        </li>
                      ) : (
                        notifications.map((notification: any) => (
                          <li
                            key={notification.id}
                            onClick={() => handleClickItemNoti(notification.id)} // Xử lý khi nhấn
                            className={`px-4 py-2 text-sm cursor-pointer rounded-md ${
                              notification.read === "false"
                                ? "bg-white text-gray-600 hover:bg-blue-100" // Chưa đọc
                                : "bg-gray-100 text-gray-400 hover:bg-gray-200" // Đã đọc
                            }`}
                          >
                            {/* Tiêu đề của thông báo */}
                            <div className="font-bold truncate">
                              {notification.title}
                            </div>

                            {/* Nội dung của thông báo */}
                            <div className="text-sm truncate">
                              {notification.message}
                            </div>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>

        {/* Menu toggle cho điện thoại */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
