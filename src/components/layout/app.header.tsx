/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);



    // Kiểm tra trạng thái đăng nhập khi component render
    useEffect(() => {
        const token = Cookies.get('access_token');
        setIsLoggedIn(!!token); // true nếu token tồn tại
    }, []);

    // Xử lý đăng xuất
    const handleLogout = () => {
        Cookies.remove('access_token'); // Xóa token trong cookie
        setIsLoggedIn(false); // Đặt trạng thái chưa đăng nhập
        alert('Bạn đã đăng xuất!');
    };

    return (
        <header className="fixed top-0 z-50 w-full bg-blue-400 border-b-2 py-4">
            <div className="container mx-auto flex items-center justify-between py-3 px-4">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <img src="img/logo.png" alt="Logo" className="object-cover h-16" />
                        <h2 className="text-4xl font-bold ml-2 delay-100 hover:text-[#E53634] md:block">ATA</h2>
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
                        href="/Mission"
                        className="font-bold text-black hover:text-[#E53634]  hover:border-[#E53634]"
                    >
                        Nhiệm vụ
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
                            {/* Hiển thị khi chưa đăng nhập */}
                            <Link
                                href="/signin"
                                className="font-bold text-black hover:text-[#E53634]  hover:border-[#E53634]"
                            >
                                Đăng nhập
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Hiển thị khi đã đăng nhập */}
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
                            d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                        ></path>
                    </svg>
                </button>
            </div>

            {/* Menu ẩn hiện khi ở điện thoại */}
            {isMenuOpen && (
                <nav className="md:hidden bg-blue-400 flex flex-col items-center gap-4 py-4">
                    <Link
                        href="/About"
                        className="font-bold text-white hover:text-[#E53634]  hover:border-[#E53634]"
                    >
                        Tin tức
                    </Link>
                    <Link
                        href="/searchPage"
                        className="font-bold text-white hover:text-[#E53634]  hover:border-[#E53634]"
                    >
                        Tra cứu
                    </Link>
                    <Link
                        href="/signup"
                        className="font-bold text-white hover:text-[#E53634]  hover:border-[#E53634]"
                    >
                        Tình nguyện viên
                    </Link>
                    <Link
                        href="/donation"
                        className="font-bold text-white hover:text-[#E53634]  hover:border-[#E53634]"
                    >
                        Ủng hộ
                    </Link>
                    <Link
                        href="/supportRequest"
                        className="font-bold text-white bg-[#E53634] px-3 py-2 rounded-md"
                    >
                        Tôi cần giúp đỡ
                    </Link>
                    {!isLoggedIn ? (
                        <>
                            {/* Hiển thị khi chưa đăng nhập */}
                            <Link
                                href="/signin"
                                className="font-bold text-white hover:text-[#E53634]  hover:border-[#E53634]"
                            >
                                Đăng nhập
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Hiển thị khi đã đăng nhập */}
                            <Link
                                href="/account"
                                className="font-bold text-white hover:text-[#E53634]  hover:border-[#E53634]"
                            >
                                Tài khoản
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="font-bold text-white hover:text-[#E53634]  hover:border-[#E53634]"
                            >
                                Đăng xuất
                            </button>
                        </>
                    )}
                </nav>
            )}
        </header>
    );
}
