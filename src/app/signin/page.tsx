/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

"use client";
import React, { useEffect, useState } from "react";
import InputField from "@/components/ui/InputField";
import ForgetPassword from "@/components/features/Authentication/ForgetPasswordModal";
import { useRouter } from "next/navigation"; // Import useRouter
import Cookies from "js-cookie";
import { showErrorToast, showSuccessToast } from "@/components/Toast/toast";
import fetchApi from "@/utils/fetchApi";
import { HTTPMethod } from "@/types/enum";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter(); // Initialize the router
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const toggleModal = () => setShowModal((prev) => !prev);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetchApi(
        "/api/login",
        HTTPMethod.POST,
        formData,
        false
      );

      const result = await response;

      if (response) {
        showSuccessToast("Đăng nhập thành công");

        if (result.accessToken) {
          Cookies.set("id", result.id, {
            expires: 1 / 24, // Expires in 1 hour
            secure: true, // Ensures the cookie is only sent over HTTPS
            sameSite: "strict", // Prevents CSRF attacks
          });
          Cookies.set("access_token", result.accessToken, {
            expires: 1 / 24, // Expires in 1 hour
            secure: true, // Ensures the cookie is only sent over HTTPS
            sameSite: "strict", // Prevents CSRF attacks
          });
          router.refresh();
          // router.push("/");
          // // Store token securely (example: sessionStorage)
          // sessionStorage.setItem('authToken', result.token);

          router.push("/account"); // Redirect to the homepage
        } else {
          showErrorToast("Đăng nhập thất bại vui lòng đăng nhập lại");
        }
      } else {
        showErrorToast("Đăng nhập thất bại vui lòng đăng nhập lại");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      showErrorToast("Đăng nhập thất bại vui lòng đăng nhập lại!");
    }
  };

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <div
        className="relative z-0 py-20 w-full box-border"
        style={{
          backgroundImage: "url('/img/section-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto text-center">
          <h2 className="my-20 text-4xl font-bold">Trang đăng nhập</h2>
          <form
            className="container md:w-[50%] sm:w-[80%] mx-auto border-2 rounded-lg py-4 p-10"
            onSubmit={handleSubmit}
          >
            {/* Sử dụng InputField cho Username */}
            <div className="mb-10">
              <InputField
                label="Tên đăng nhập"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Nhập tên đăng nhập của bạn"
              />
            </div>

            {/* Sử dụng InputField cho Password */}
            <div className="my-4">
              <InputField
                label="Mật khẩu"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu của bạn"
              />
            </div>

            {/* Forget Password */}
            <div className="my-6 text-right">
              <button
                type="button"
                onClick={toggleModal}
                className="text-blue-500"
              >
                Quên mật khẩu?
              </button>
            </div>

            {/* Submit Button */}
            <div className="w-full mt-10">
              <button
                type="submit"
                className="border-2 border-blue-400 delay-75 w-full py-2 rounded-xl text-blue-400 hover:text-white hover:bg-blue-400"
              >
                Đăng nhập
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="flex justify-center my-4 gap-2">
              <p>Bạn đã chưa có tài khoản?</p>
              <a href="/signup" className="font-bold text-blue-400">
                Đăng ký ngay
              </a>
            </div>
          </form>
        </div>
        {showModal && <ForgetPassword />}
      </div>
    </>
  );
}
