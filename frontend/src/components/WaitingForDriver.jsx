import React, { forwardRef } from "react";
import { MdPinDrop } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoStarSharp, IoSend } from "react-icons/io5";
import { FcBiohazard, FcCallback, FcAutomatic } from "react-icons/fc";

const buttonData = [
  {
    icons: FcBiohazard,
    text: "safety",
  },
  {
    icons: FcAutomatic,
    text: "share my trip",
  },
  {
    icons: FcCallback,
    text: "call driver",
  },
];

// this is the component that show the driver waiting part
const WaitingForDriver = forwardRef((props,ref) => {
  return (
    <div ref={ref} className="fixed w-full  bottom-0 bg-white z-10 px-3 py-2">
      <div className="flex justify-between gap-4">
        <h3 className="text-lg capitalize font-semibold  py-2 px-2">
          meet at the pickup point
        </h3>

        <h4 className="bg-black text-white rounded-xl font-semibold py-2 px-4 flex justify-center  items-center">
          2 min
        </h4>
      </div>

      <div className="mt-2">
        <div className="border-2 border-gray-300 w-full rounded-full mb-4"></div>
      </div>

      {/* driver info $ ride info  */}
      <div className="w-full mt-2">
        {/* driver info  */}

        <div className="w-full  flex justify-between">
          {/* driver and car image  */}
          <div className="driverImage flex relative">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              className="h-16 w-16 rounded-full z-2"
              alt=""
            />

            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_1152/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/BlackSUV.png"
              className="h-16 w-16 rounded-full relative right-3"
              alt=""
            />
          </div>

          <div className="uppercase">
            <h3 className="text-end font-semibold text-base text-gray-500">
              sunny
            </h3>
            <h2 className="text-end font-semibold text-xl">UP 32 BC 0001</h2>
            <h4 className="text-end font-semibold text-base text-gray-500">
              White Suzuki S-Presso LXI
            </h4>
            <span className="flex items-center justify-end text-end font-semibold text-gray-500 text-base gap-1.5">
              <IoStarSharp />
              4.5
            </span>
          </div>
        </div>

        {/* send message section  */}
        <div className="w-60 flex items-center bg-gray-300 rounded-2xl">
          <input
            type="text"
            placeholder="send a message..."
            className="py-2 px-3 placeholder:font-semibold placeholder:capitalize outline-none border-none"
          />
          <IoSend className="h-5 w-5" />
        </div>

        {/* action buttons */}

        <div className="action-buttons flex items-center justify-around my-4">
          {buttonData.map((data, key) => {
            const Icon = data.icons;
            return (
              <div className=" flex flex-col items-center gap-3" key={key}>
                <Icon className="h-10 w-10 bg-gray-300 py-1 px-1 rounded-full" />
                <h3 className="font-semibold capitalize text-sm">{data.text}</h3>
              </div>
            );
          })}
        </div>

        {/* location info  */}
        <div className="w-full flex flex-col">
          {/* destination address  */}

          <div className="flex items-center gap-4 px-3 py-1 border-b-4 border-gray-200 mb-3">
            <MdPinDrop className="h-8 w-8" />
            <div className="text">
              <h1 className="text-lg font-bold capitalize">562/11-A</h1>
              <p className="text-sm capitalize ">
                church street, bengaluru, karnatka
              </p>
            </div>
          </div>

          {/* pickup  address  */}
          <div className="flex items-center gap-4 px-3 py-1 border-b-4 border-gray-200 -mt-2 mb-2">
            <FaLocationDot className="h-7 w-7" />
            <div className="text">
              <h1 className="text-lg font-bold capitalize">
                Third wave, coffe shop
              </h1>
              <p className="text-sm capitalize">
                cubbon road, bengaluru, karnatka
              </p>
            </div>
          </div>

          {/* price  */}

          <div className="flex items-center gap-4 px-3  border-b-4 border-gray-200 -mt-2">
            <GiTakeMyMoney className="h-8 w-8" />
            <div className="text">
              <span className="text-lg font-bold">₹198.22</span>
              <p className="text-sm capitalize">cash cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})

export default WaitingForDriver;
