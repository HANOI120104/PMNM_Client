export default function AccountTab() {
    return (
        <div className="grid grid-cols-3 p-4">
            <div className="text-left col-span-1 my-2">
                <p className="py-2 font-bold text-xl">Họ và tên:</p>
                <p className="py-2 font-bold text-xl">Tuổi:</p>
                <p className="py-2 font-bold text-xl">Giới tính</p>
                <p className="py-2 font-bold text-xl">Email:</p>
                <p className="py-2 font-bold text-xl">Địa chỉ:</p>
            </div>
            <div className="text-left col-span-2 my-2">
                <p className="py-2 text-xl">Nguyễn Văn A</p>
                <p className="py-2 text-xl">Nguyễn Văn A</p>
                <p className="py-2 text-xl">Nguyễn Văn A</p>
                <p className="py-2 text-xl">Nguyễn Văn A</p>
                <p className="py-2 text-xl">Nguyễn Văn A</p>
            </div>
        </div>
    )
}