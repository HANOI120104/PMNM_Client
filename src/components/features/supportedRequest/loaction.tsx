import React, { useState } from 'react';

const GetCoordinates: React.FC = () => {
    const [coordinates, setCoordinates] = useState<string>('');  // Sử dụng useState để lưu trữ thông tin tọa độ

    const getCurrentCoordinates = () => {
        // Kiểm tra nếu trình duyệt hỗ trợ Geolocation API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setCoordinates(`Latitude: ${lat}, Longitude: ${lon}`);
                    console.log("Latitude:", lat);
                    console.log("Longitude:", lon);
                },
                (error: GeolocationPositionError) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            setCoordinates("Người dùng từ chối truy cập vị trí.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            setCoordinates("Thông tin vị trí không khả dụng.");
                            break;
                        case error.TIMEOUT:
                            setCoordinates("Yêu cầu lấy vị trí bị hết thời gian.");
                            break;
                        default:
                            setCoordinates("Đã xảy ra lỗi không xác định.");
                            break;
                    }
                    console.error("Lỗi:", error.message);
                }
            );
        } else {
            setCoordinates("Trình duyệt không hỗ trợ Geolocation.");
            console.error("Trình duyệt không hỗ trợ Geolocation API.");
        }
    };

    return (
        <div>
            <button onClick={getCurrentCoordinates}>Lấy tọa độ</button>
            <p id="coordinates">{coordinates}</p>
        </div>
    );
};

export default GetCoordinates;
