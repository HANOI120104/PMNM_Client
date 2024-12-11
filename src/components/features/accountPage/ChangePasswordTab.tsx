"use client";
import { useState } from "react";
import fetchApi from "@/utils/fetchApi";
import { HTTPMethod } from "@/types/enum";
import { showErrorToast, showSuccessToast } from "@/components/Toast/toast";

export default function Update() {
  const [formData, setFormData] = useState({
    passwordNew: "",
    passwordOld: "",
    confirmPassword: "",
  });

  // Password visibility state
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log("🚀 ~ Update ~ value:", value);
    console.log("🚀 ~ Update ~ name:", name);
    setFormData({ ...formData, [name]: value });
  };

  // Submit form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      if (formData.passwordNew !== formData.confirmPassword) {
        showErrorToast("Mật khẩu mới và xác nhận mật khẩu phải trùng nhau!");
        return;
      }
      const { confirmPassword, ...formDataNew } = formData;
      const response = await fetchApi(
        "/api/users/reset-password-v2",
        HTTPMethod.POST,
        formDataNew,
        true
      );

      if (response) {
        showSuccessToast("Cập nhật mật khẩu thành công");
      } else {
        showErrorToast("Failed to update profile.");
      }
    } catch (error: any) {
      showErrorToast(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-3 p-4">
      <div className="text-left col-span-1 my-2">
        <label className="py-2 font-bold text-xl block">
          Mật khẩu hiện tại:
        </label>
        <label className="py-2 font-bold text-xl block">Mật khẩu mới:</label>
        <label className="py-2 font-bold text-xl block">
          Xác nhận mật khẩu mới:
        </label>
      </div>
      <div className="text-left col-span-2 my-2">
        <div className="relative mb-2">
          <input
            type={showPasswordOld ? "text" : "password"}
            name="passwordOld"
            value={formData.passwordOld}
            onChange={handleInputChange}
            className="w-full border px-2 py-2"
          />
          <button
            type="button"
            onClick={() => setShowPasswordOld(!showPasswordOld)}
            className="absolute right-2 top-2 text-xl"
          >
            {showPasswordOld ? "🙈" : "👁️"}
          </button>
        </div>
        <div className="relative mb-2">
          <input
            type={showPasswordNew ? "text" : "password"}
            name="passwordNew"
            value={formData.passwordNew}
            onChange={handleInputChange}
            className="w-full border px-2 py-2"
          />
          <button
            type="button"
            onClick={() => setShowPasswordNew(!showPasswordNew)}
            className="absolute right-2 top-2 text-xl"
          >
            {showPasswordNew ? "🙈" : "👁️"}
          </button>
        </div>
        <div className="relative mb-2">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full border px-2 py-2"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-2 text-xl"
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>
      <div className="col-span-3 text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Cập nhật
        </button>
      </div>
    </form>
  );
}
