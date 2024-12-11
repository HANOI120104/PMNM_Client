// components/NotificationPermission.tsx
"use client"; // Đảm bảo chỉ chạy trên client

import { useEffect } from "react";

const NotificationPermission = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        // Kiểm tra và yêu cầu quyền thông báo
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Quyền thông báo đã được cấp.");
        } else {
          console.log("Quyền thông báo bị từ chối.");
        }
      } catch (error) {
        console.error("Lỗi khi yêu cầu quyền thông báo", error);
      }
    };

    // Yêu cầu quyền thông báo khi component được mount trên client
    requestPermission();
  }, []); // Chạy chỉ 1 lần khi component mount

  return null; // Không cần render gì cả, chỉ yêu cầu quyền thông báo
};

export default NotificationPermission;
