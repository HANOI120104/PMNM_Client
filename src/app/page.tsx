/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client'
import { useEffect, useState } from "react";
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import Link from "next/link";


export default function Home() {
  const slides = [
    { id: 1, image: "https://images.pexels.com/photos/933624/pexels-photo-933624.jpeg", caption: "Số điện thoại khẩn cấp: 0123 4567 hoặc bấm nút", url: "/supportRequest", content: "Tôi cần giúp đỡ" },
    { id: 2, image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg", caption: "Tham gia chung tay vun vén ảnh lửa nhỏ", url: "/signup", content: "Trở thành tình nguyện viên" },
    { id: 3, image: "https://images.pexels.com/photos/6471969/pexels-photo-6471969.jpeg", caption: "Ủng hộ để giúp đỡ những hoàn cảnh khó khăn giữ gìn truyền thống lá lành đùm lá rách", url: "/Donation", content: "Trở thành mạnh thường quân" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  useEffect(() => {
    createChat({
      webhookUrl: 'https://nguyentu123.app.n8n.cloud/webhook/97a196f3-6d21-4df6-bbcb-ba0dbe7376ae/chat',
      initialMessages: [
        'Hi there! 👋',
        'My name is Nathan. How can I assist you today?',
        'Vui long nhap so dien thoai de bat dau chat'
      ],
    });
  }, []);
  useEffect(() => {
    // Initialize Firebase only if not already initialized
    // const app = getApps()?.length === 0 ? initializeApp({
    //   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    //   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    //   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    //   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    //   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    //   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    // }) : getApp(); // Get existing app if already initialized

    // const messaging = getMessaging(app); // Initialize messaging service

    const requestPermission = async () => {
      try {
        // Request notification permission from the user
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Quyền thông báo đã được cấp.');

          // Get FCM Token (with vapidKey)
          // const token = await getToken(messaging, {
          //   vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!, // Don't forget to provide this VAPID key
          // });
          // console.log('FCM Token:', token);
        } else {
          console.log('Quyền thông báo bị từ chối.');
        }
      } catch (error) {
        console.error('Lỗi khi yêu cầu quyền thông báo', error);
      }
    };

    // // Request notification permission when the component is mounted
    // requestPermission();

    // // Listen for foreground messages
    // const unsubscribe = onMessage(messaging, (payload) => {
    //   console.log('Đã nhận thông báo:', payload);
    //   // Handle the message (for foreground notifications)
    // });

    // // Cleanup on component unmount
    // return () => {
    //   unsubscribe(); // Unsubscribe from the listener when the component is unmounted
    // };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="relative z-0 w-full overflow-hidden border-b-2 mb-10">
      <div className="relative flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <img src={slide.image} alt={slide.caption} className="w-full h-screen object-cover" />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center px-4 md:px-0">
              <p className="mt-2 text-white text-2xl md:text-4xl">{slide.caption}</p>
              <Link href={slide.url} className="text-2xl md:text-4xl text-white rounded-lg bg-[#E53634] border-2 border-[#E53634] px-20 py-4 mt-4">
                {slide.content}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button onClick={prevSlide} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white text-xl p-2 md:p-4 rounded-full">
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white text-xl p-2 md:p-4 rounded-full">
        &#8594;
      </button>
    </div>
  );
}
