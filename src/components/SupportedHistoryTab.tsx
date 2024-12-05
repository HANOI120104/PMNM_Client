export default function ChangePassword() {
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
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b-2">
                            <td className="px-4 py-2">1</td>
                            <td className="px-4 py-2">Tiền</td>
                            <td className="px-4 py-2">100.000</td>
                            <td className="px-4 py-2"><a href="" className="bg-green-400 p-2 rounded-lg text-white">Xem chi tiết</a></td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">2</td>
                            <td className="px-4 py-2">Hàng</td>
                            <td className="px-4 py-2">200</td>
                            <td className="px-4 py-2"><a href="" className="bg-green-400 p-2 rounded-lg text-white">Xem chi tiết</a></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}