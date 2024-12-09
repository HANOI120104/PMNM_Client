/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                {/* Phần trên của footer */}
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-bold">Liên hệ với chúng tôi</h3>
                        <p className="mt-2">Hotline: <a href="tel:0123456789" className="text-blue-400 hover:underline">0123456789</a></p>
                        <p>Email: <a href="mailto:contact@organization.com" className="text-blue-400 hover:underline">contact@organization.com</a></p>
                    </div>
                    <div className="mt-6 sm:mt-0">
                        <h3 className="text-xl font-bold">Theo dõi chúng tôi</h3>
                        <div className="flex space-x-4 mt-2">
                            <a href="#" className="text-blue-400 hover:text-white"><i className="fab fa-facebook"></i> Facebook</a>
                            <a href="#" className="text-blue-400 hover:text-white"><i className="fab fa-twitter"></i> Twitter</a>
                            <a href="#" className="text-blue-400 hover:text-white"><i className="fab fa-instagram"></i> Instagram</a>
                        </div>
                    </div>
                </div>

                {/* Dòng phân cách */}
                <div className="border-t border-gray-700 my-6"></div>

                {/* Phần dưới của footer */}
                <div className="text-center">
                    <p className="text-sm">
                        © 2024 Tên Tổ Chức. Mọi quyền được bảo lưu.
                    </p>
                    <p className="mt-2">
                        Thiết kế bởi <a href="https://yourwebsite.com" className="text-blue-400 hover:underline">YourWebsite</a>.
                    </p>
                </div>
            </div>
        </footer>
    );
}