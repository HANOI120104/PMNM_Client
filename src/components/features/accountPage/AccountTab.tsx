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

  return (
    <div className="grid grid-cols-3 p-4">
      <div className="text-left col-span-1 my-2">
        <p className="py-2 font-bold text-xl">Họ và tên:</p>
        <p className="py-2 font-bold text-xl">Giới tính:</p>
        <p className="py-2 font-bold text-xl">Email:</p>
        <p className="py-2 font-bold text-xl">Địa chỉ:</p>
        {userData && userData.roles[0] === "member" && (
          <>
            <p className="py-2 font-bold text-xl">Điểm:</p>
            <p className="py-2 font-bold text-xl">Rank:</p>
          </>
        )}
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
        {userData && userData.roles[0] === "member" && (
          <>
            <p className="py-2 text-xl">{userData?.score ?? 0}</p>
            <p className="py-2 text-xl">Bạc</p>
          </>
        )}
      </div>
    </div>
  );
}
