"use client"; // Đảm bảo component này chỉ chạy ở phía client

import { useRouter } from "next/navigation"; // Import useRouter

const SuccessPage = () => {
  const router = useRouter();

  // Hàm quay lại trang trước đó
  const handleBack = () => {
    router.back(); // Quay lại trang trước đó
  };

  // Hàm quay về trang chủ
  const handleHome = () => {
    router.push('/'); // Đưa người dùng về trang chủ
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
        <h2 className="text-3xl font-semibold text-green-600 mb-4">Đóng góp thành công!</h2>
        <p className="text-lg text-gray-600 mb-4">
          Cảm ơn bạn đã tham gia ủng hộ. Mọi đóng góp của bạn đều có ý nghĩa lớn.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Quay lại
          </button>
          <button
            onClick={handleHome}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
