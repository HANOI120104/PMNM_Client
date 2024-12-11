"use client";

import { useEffect, useState } from "react";
import AccountTab from "@/components/features/accountPage/AccountTab";
import ChangePasswordTab from "@/components/features/accountPage/ChangePasswordTab";
import UpdateAccountTab from "@/components/features/accountPage/UpdateAccountTab";
import DonationHistoryTab from "@/components/features/accountPage/DonationHistoryTab";
import SupportedHistoryTab from "@/components/features/accountPage/SupportedHistoryTab";
import WorkplanTab from "@/components/features/accountPage/WorkplanTab";
import fetchApi from "@/utils/fetchApi";
import { HTTPMethod } from "@/types/enum";
import Cookies from "js-cookie";

enum Tabs {
    PROFILE = "profile",
    UPDATE_ACCOUNT = "updateAccount",
    DONATION_HISTORY = "donationHistory",
    SUPPORTED_HISTORY = "supportedHistory",
    WORKPLAN = "workplan",
    CHANGE_PASSWORD = "changePassword",
}

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, type, name, value, placeholder, onChange }: InputFieldProps) => (
    <div className="flex items-center space-x-4">
        <label htmlFor={name} className="text-sm font-medium text-gray-700 w-1/4">
            {label}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out w-full"
            placeholder={placeholder}
        />
    </div>
);

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.PROFILE);
    const [userData, setUserData] = useState<any>(null);
    const [formValues, setFormValues] = useState({
        city: "",
        address: "",
        zipCode: "",
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const id = Cookies.get("id");
                if (!id) throw new Error("ID người dùng không hợp lệ.");

                const response = await fetchApi(`/api/users/${id}`, HTTPMethod.GET, null, true);
                if (!response) throw new Error("Không thể lấy dữ liệu người dùng.");

                setUserData(response);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, []);



    return (
        <div className="relative z-0 py-20 w-full box-border bg-cover bg-center">
            <div className="container py-20 mx-auto text-center grid grid-cols-6">
                <div className="col-span-2 mx-4">
                    <div className="p-4 border-2 rounded-xl bg-white">
                        <div className="flex justify-center">
                            <img
                                className="w-24 h-24 border-2 rounded-full"
                                src="/img/icons8-user-100.png"
                                alt="Profile"
                            />
                        </div>
                        <p className="text-lg font-medium">{userData?.firstName} {userData?.lastName}</p>
                        <p>Chức vụ: {userData?.roles?.join(", ") || "Tình nguyện viên"}</p>
                    </div>
                </div>
                <div className="col-span-4 mx-4">
                    <div className="p-4 border-2 rounded-xl bg-white">
                        <div className="mt-6">
                            {Object.entries(formValues).map(([key, value]) => (
                                <div className="my-4">
                                    <InputField
                                        key={key}
                                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                                        type="text"
                                        name={key}
                                        value={value}
                                        placeholder={`Enter ${key}`}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            ))}

                        </div>
                        <div className="my-4 mx-4 w-full flex justify-center">
                            <button className="border-2 border-red-600 text-red-600 font-medium hover:bg-red-600 hover:text-white rounded-lg mx-4 my-2 py-2 px-4">Từ chối</button>
                            <button className="border-2 border-green-600 text-green-600 font-medium hover:bg-green-600 hover:text-white rounded-lg mx-4 my-2 py-2 px-4">Chấp nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
