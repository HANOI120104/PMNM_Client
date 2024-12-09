/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AccountTab() {
    const [userData, setUserData] = useState<any>(null); // State để lưu dữ liệu người dùng
    const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
    const [error, setError] = useState<string | null>(null); // State để lưu lỗi nếu có

    // Hàm đảm bảo dữ liệu luôn trả về kiểu string
    const formatString = (value: any): string => {
        return value !== undefined && value !== null ? String(value) : "Không có thông tin";
    };

    useEffect(() => {
        // Gọi API để lấy dữ liệu người dùng
        const fetchData = async () => {
            try {
                const getCookie = Cookies.get('access_token')
                // console.log(getCookie)
                const response = await fetch(`http://localhost:8000/api/users/${getCookie}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${getCookie}`
                        }
                    }
                ); // Thay URL bằng API của bạn
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
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

    if (loading) return <p>Đang tải dữ liệu...</p>; // Hiển thị trạng thái loading
    if (error) return <p>Lỗi: {error}</p>; // Hiển thị lỗi nếu xảy ra

    return (
        <div className="grid grid-cols-3 p-4">
            <div className="text-left col-span-1 my-2">
                <p className="py-2 font-bold text-xl">Họ và tên:</p>
                <p className="py-2 font-bold text-xl">Tuổi:</p>
                <p className="py-2 font-bold text-xl">Giới tính:</p>
                <p className="py-2 font-bold text-xl">Email:</p>
                <p className="py-2 font-bold text-xl">Địa chỉ:</p>
            </div>
            <div className="text-left col-span-2 my-2">
                <p className="py-2 text-xl">{formatString(userData?.name)}</p>
                <p className="py-2 text-xl">{formatString(userData?.age)}</p>
                <p className="py-2 text-xl">{formatString(userData?.gender)}</p>
                <p className="py-2 text-xl">{formatString(userData?.email)}</p>
                <p className="py-2 text-xl">{formatString(userData?.address)}</p>
            </div>
        </div>
    );
}
