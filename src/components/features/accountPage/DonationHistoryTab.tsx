/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export default function Donate() {
    return (
        <div className="grid grid-row p-4">
            <div className="flex gap-4 py-4 items-center py-4 border-b-2 border-dashed" >
                <label htmlFor="" className="font-medium">Tìm kiếm</label>
                <input type="text" name="" id="" placeholder="Nhập mã" className="flex-grow border-2 p-2 outline-0" />
            </div>
            <div className="py-4">
                <table className="w-full border-spacing-4 border-separate">
                    <thead className="pb-4">
                        <tr>
                            <th>Id</th>
                            <th>Loại</th>
                            <th>Số lượng</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Tiền</td>
                            <td>100.000</td>
                            <td className="text-green-400">Đã nhận</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Hàng</td>
                            <td>200</td>
                            <td className="text-red-400">Chưa nhận</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}