/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export default function ForgetPassword() {
    return (
        <div className="relative z-0 w-full box-border "
            style={{
                backgroundImage: "url('/img/section-background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
            <div className="container mx-auto py-20 text-center px-4" >
                <form action="">
                    <h2 className="my-20 text-4xl font-bold">Khôi phục mật khẩu</h2>
                    <div className="container md:w-[50%] sm:[80%] mx-auto border-2 rounded-lg py-4 grid grid-cols-3 p-10" >
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Email</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <input type="text" className="w-[90%] border-b-2 px-2" placeholder="Nhập họ và tên của bạn" name="fullName" />
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Mật khẩu mới</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <input type="text" className="border-b-2 w-[90%] border-b-2 px-2" placeholder="Nhập số điện thoại" name="phone" />
                        </div>
                        <div className="col-span-1 w-[100%] my-6 flex  justify-start items-start pl-6">
                            <label htmlFor="" className="mr-4">Xác nhận mật khẩu</label>
                        </div>
                        <div className="col-span-2 w-[100%] my-6 flex  justify-start items-start">
                            <input type="text" className="border-b-2 w-[90%] border-b-2 px-2" placeholder="Nhập số điện thoại" name="phone" />
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