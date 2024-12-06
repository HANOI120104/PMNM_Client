'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => setIsLoggedIn(true); // Xử lý đăng nhập
    const handleLogout = () => setIsLoggedIn(false); // Xử lý đăng xuất

    return (
        <header className="fixed top-0 z-50 w-full bg-blue-400 border-b-2 py-4">
            <div className="container mx-auto flex items-center justify-between py-3 px-4">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <img src="img/logo.png" alt="Logo" className="object-cover h-16" />
                        <h2 className="text-4xl font-bold ml-2 delay-100 hover:text-[#E53634] md:block">FREE FIRE</h2>
                    </Link>
                </div>

                {/* Menu cho laptop */}
                <nav className="hidden md:flex gap-10 items-center">
                    <Link
                        href="/About"
                        className="font-bold text-black hover:text-[#E53634]  hover:border-[#E53634]"
                    >
                        Tin tức
                    </Link>
                    <Link
                        href="/SearchPage"
                        className="font-bold text-black hover:text-[#E53634]  hover:border-[#E53634]"
                    >
                        Tra cứu
                    </Link>
                    <Link
                        href="/Sign_Up"
                        className="font-bold text-black hover:text-[#E53634]  hover:border-[#E53634]"
                    >
                        Tình nguyện viên
                    </Link>
                    <Link
                        href="/Donation"
                        className="font-bold text-black hover:text-[#E53634]  hover:border-[#E53634]"
                    >
                        Ủng hộ
                    </Link>
                    <Link
                        href="/SupportRequest"
                        className="font-bold text-white bg-[#E53634] px-8 py-4 rounded-md hover:bg-blue-800"
                    >
                        Tôi cần giúp đỡ
                    </Link>

                    {!isLoggedIn ? (
                        <>
                            {/* Hiển thị khi chưa đăng nhập */}
                            <Link
                                href="/Sign_In"
                                className="font-bold text-black hover:text-[#E53634]  hover:border-[#E53634]"
                            >
                                Đăng nhập
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Hiển thị khi đã đăng nhập */}
                            <Link
                                href="/Account"
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
                        href="/SearchPage"
                        className="font-bold text-white hover:text-[#E53634]  hover:border-[#E53634]"
                    >
                        Tra cứu
                    </Link>
                    <Link
                        href="/Sign_Up"
                        className="font-bold text-white hover:text-[#E53634]  hover:border-[#E53634]"
                    >
                        Tình nguyện viên
                    </Link>
                    <Link
                        href="/Donation"
                        className="font-bold text-white hover:text-[#E53634]  hover:border-[#E53634]"
                    >
                        Ủng hộ
                    </Link>
                    <Link
                        href="/SupportRequest"
                        className="font-bold text-white bg-[#E53634] px-3 py-2 rounded-md"
                    >
                        Tôi cần giúp đỡ
                    </Link>
                    {!isLoggedIn ? (
                        <>
                            {/* Hiển thị khi chưa đăng nhập */}
                            <Link
                                href="/Sign_In"
                                className="font-bold text-white hover:text-[#E53634]  hover:border-[#E53634]"
                            >
                                Đăng nhập
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Hiển thị khi đã đăng nhập */}
                            <Link
                                href="/Account"
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
