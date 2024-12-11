/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import fetchApi from "@/utils/fetchApi";
import { HTTPMethod } from "@/types/enum";
interface Props {
  userData: any;
}
export default function AccountTab(props: Props) {
  const { userData } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const formatString = (value: any): string => {
    return value !== undefined && value !== null && value !== ""
      ? String(value)
      : "Không có thông tin";
  };

  const convertGT = (sex?: string) => {
    switch (sex) {
      case "Male":
        return "Nam";
      case "Female":
        return "Nữ";
      default:
        return null;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = Cookies.get("id");
        const response = await fetchApi(
          `/api/users/${id}`,
          HTTPMethod.GET,
          null,
          true
        ); // Thay URL bằng API của bạn
        if (!response) {
          throw new Error("Failed to fetch data");
        }
        const data = await response;
        userData(data);
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

  return (
    <div className="grid grid-cols-3 p-4">
      <div className="text-left col-span-1 my-2">
        <p className="py-2 font-bold text-xl">Họ và tên:</p>
        <p className="py-2 font-bold text-xl">Giới tính:</p>
        <p className="py-2 font-bold text-xl">Email:</p>
        <p className="py-2 font-bold text-xl">Địa chỉ:</p>
      </div>
      <div className="text-left col-span-2 my-2">
        <p className="py-2 text-xl">
          {formatString(`${userData?.firstName} ${userData?.lastName}`)}
        </p>
        <p className="py-2 text-xl">{formatString(convertGT(userData?.sex))}</p>
        <p className="py-2 text-xl">{formatString(userData?.email)}</p>
        <p className="py-2 text-xl">
          {formatString(
            `${userData?.address
              ? `${userData?.address?.ward || ""}  ${userData?.address?.district || ""
              } ${userData?.address?.city || ""}`
              : ""
            }`
          )}
        </p>
      </div>
    </div>
  );
}
