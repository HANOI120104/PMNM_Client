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

export default function Home() {
  const slides = [
    { id: 1, image: "https://images.pexels.com/photos/933624/pexels-photo-933624.jpeg", caption: "Số điện thoại khẩn cấp: 0123 4567 hoặc bấm nút", url: "/SupportRequest", content: "Tôi cần giúp đỡ" },
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

  return (
    <div className="relative z-0 w-full overflow-hidden border-b-2 mb-10">
      <div className="relative flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <img src={slide.image} alt={slide.caption} className="w-full h-screen object-cover" />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center px-4 md:px-0">
              <p className="mt-2 text-white text-2xl md:text-4xl">{slide.caption}</p>
              <a href={slide.url} className="text-2xl md:text-4xl text-white rounded-lg bg-[#E53634] border-2 border-[#E53634] px-20 py-4 mt-4">
                {slide.content}
              </a>
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
