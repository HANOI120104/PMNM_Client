import fetchApi from "@/utils/fetchApi"

export default function Donation() {


    return (
        <div className="relative z-0 w-full box-border "
            style={{
                backgroundImage: "url('/img/section-background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
            <div className="container mx-auto py-20 text-center px-4" >
                <form action="">
                    <h2 className="my-20 text-4xl font-bold">Dành cho mạnh thường quân - Ủng hộ </h2>
                    <div className="container md:w-[50%] sm:[80%] mx-auto border-2 rounded-lg py-4 grid grid-cols-3 p-10" >
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Họ và tên</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <input type="text" className="w-[90%] border-b-2 px-2" placeholder="Nhập họ và tên của bạn" name="fullName" />
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Số điện thoại</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <input type="text" className="border-b-2 w-[90%] border-b-2 px-2" placeholder="Nhập số điện thoại" name="phone" />
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Thành Phố/Tỉnh</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <select name="" id="" className="border-b-2 w-[90%] border-b-2 px-2">
                                <option value="city">Hà Nội</option>
                            </select>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Quận/Huyện</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <select name="district" id="" className="border-b-2 w-[90%] border-b-2 px-2">
                                <option value="">Đống Đa</option>
                            </select>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Phường/Xã</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <select name="ward" id="" className="border-b-2 w-[90%] border-b-2 px-2">
                                <option value="">Thổ Quan</option>
                            </select>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Loại</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <select name="typeSupply" id="" className="border-b-2 w-[90%] border-b-2 px-2">
                                <option value="money">Tiền</option>
                                <option value="goods">Vật tư</option>
                            </select>
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Số lượng</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <select name="typeSupply" id="" className="border-b-2 w-[90%] border-b-2 px-2">
                                <option value="money">Tiền</option>
                                <option value="goods">Vật tư</option>
                            </select>
                        </div>
                        <div className="col-span-3 w-full mt-10">
                            <button className="border-2 border-blue-400 delay-75 w-[90%] py-2 rounded-xl text-blue-400 hover:text-white hover:bg-blue-400">Xác nhận</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}