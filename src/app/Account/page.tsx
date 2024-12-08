'use client'
import { useState } from 'react';
import AccountTab from '@/components/features/accountPage/AccountTab';
import ChangePasswordTab from '@/components/features/accountPage/ChangePasswordTab';
import UpdateAccountTab from '@/components/features/accountPage/UpdateAccountTab';
import DonationHistoryTab from '@/components/features/accountPage/DonationHistoryTab';
import SupportedHistoryTab from '@/components/features/accountPage/SupportedHistoryTab';

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState('profile'); // Default tab
    const [check, setCheck] = useState(false);
    const attendance = () => { }

    // Function to render the active tab content
    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return <AccountTab />;
            case 'updateAccount':
                return <UpdateAccountTab />;
            case 'donationHistory':
                return <DonationHistoryTab />;
            case 'supportedHistory':
                return <SupportedHistoryTab />;
            case 'changePassword':
                return <ChangePasswordTab />;
            default:
                return <AccountTab />;
        }
    };

    return (
        <div
            className="relative z-0 py-20 w-full box-border"
            style={{
                backgroundImage: "url('/img/section-background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="container py-20 mx-auto text-center grid grid-cols-6">
                <div className="col-span-2">
                    <div className="mx-2 grid-row text-center items-center border-2 p-4 rounded-xl drop-shadow-md bg-white">
                        <div className="flex justify-center">
                            <img
                                className="w-24 h-24 object-cover border-2 rounded-full my-2"
                                src="/img/icons8-user-100.png"
                                alt="Profile"
                            />
                        </div>
                        <p className="text-lg font-medium">Phạm Nhật Anh</p>
                        <p>Chức vụ: Tình nguyện viên</p>
                        <button className="border-rose-600 border-2 rounded-lg px-4 py-2 my-2 hover:bg-red-600 hover:text-white">Điểm danh</button>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="mx-2 grid-row text-center items-center border-2 p-4 rounded-xl drop-shadow-md bg-white">
                        <div className="border-b-2 p-4">
                            <nav className="gap-4 flex justify-between">
                                <button
                                    className={`px-4 py-2 ${activeTab === 'profile' ? 'font-bold text-blue-500' : ''
                                        }`}
                                    onClick={() => setActiveTab('profile')}
                                >
                                    Hồ Sơ
                                </button>
                                <button
                                    className={`px-4 py-2 ${activeTab === 'updateAccount' ? 'font-bold text-blue-500' : ''
                                        }`}
                                    onClick={() => setActiveTab('updateAccount')}
                                >
                                    Thay đổi hồ sơ
                                </button>
                                <button
                                    className={`px-4 py-2 ${activeTab === 'donationHistory' ? 'font-bold text-blue-500' : ''
                                        }`}
                                    onClick={() => setActiveTab('donationHistory')}
                                >
                                    Lịch sử từ thiện
                                </button>
                                <button
                                    className={`px-4 py-2 ${activeTab === 'supportedHistory' ? 'font-bold text-blue-500' : ''
                                        }`}
                                    onClick={() => setActiveTab('supportedHistory')}
                                >
                                    Lịch sử yêu cầu
                                </button>
                                <button
                                    className={`px-4 py-2 ${activeTab === 'changePassword' ? 'font-bold text-blue-500' : ''
                                        }`}
                                    onClick={() => setActiveTab('changePassword')}
                                >
                                    Cập nhật mật khẩu
                                </button>
                            </nav>
                        </div>
                        <div className="p-4">{renderTabContent()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
