import { forwardRef } from "react";
import { MdPinDrop } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaMessage } from "react-icons/fa6";
import { getVehicle } from "../utils/vechiles";

// driver mil gaya: uski detail aur OTP dikhao
const WaitingForDriver = forwardRef(({ ride, onMessage, unread = 0 }, ref) => {
  const captain = ride?.captain;
  const vehicle = getVehicle(ride?.vehicleType);
  const driverName = captain
    ? `${captain.fullName?.firstName ?? ""} ${captain.fullName?.lastName ?? ""}`
    : "";

  return (
    <div ref={ref} className="fixed w-full bottom-0 bg-white z-10 px-3 py-3">
      <h3 className="text-lg capitalize font-semibold px-2">meet at the pickup point</h3>

      <div className="border-2 border-gray-300 w-full rounded-full my-3"></div>

      {/* OTP: user driver ko batayega */}
      <div className="bg-black text-white rounded-xl py-3 px-4 flex items-center justify-between mb-4">
        <span className="capitalize">share this OTP with your driver</span>
        <span className="text-2xl font-bold tracking-widest">{ride?.otp}</span>
      </div>

      {/* driver aur gaadi ki detail */}
      <div className="w-full flex justify-between items-center mb-4">
        {vehicle && <vehicle.icon className="h-16 w-20 text-gray-800" />}

        <div className="text-end">
          <h3 className="font-semibold text-base text-gray-500 capitalize">{driverName}</h3>
          <h2 className="font-semibold text-xl uppercase">{captain?.vechile?.numberPlate}</h2>
          <h4 className="font-semibold text-base text-gray-500 capitalize">
            {captain?.vechile?.color} {captain?.vechile?.model}
          </h4>
        </div>
      </div>

      {/* driver ko message */}
      <button
        onClick={onMessage}
        className="relative w-full flex items-center justify-center gap-2 bg-gray-200 rounded-xl py-3 mb-4 font-semibold capitalize"
      >
        <FaMessage className="h-5 w-5" />
        message driver
        {unread > 0 && (
          <span className="absolute top-2 right-3 bg-red-500 text-white text-xs rounded-full h-5 min-w-5 px-1 flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* ride ki detail */}
      <div className="w-full flex flex-col">
        <div className="flex items-center gap-4 px-3 py-1 border-b-4 border-gray-200 mb-3">
          <MdPinDrop className="h-8 w-8" />
          <div className="text">
            <h1 className="text-sm font-bold uppercase text-gray-500">pickup</h1>
            <p className="text-base capitalize">{ride?.pickup}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-3 py-1 border-b-4 border-gray-200 -mt-2 mb-2">
          <FaLocationDot className="h-7 w-7" />
          <div className="text">
            <h1 className="text-sm font-bold uppercase text-gray-500">drop</h1>
            <p className="text-base capitalize">{ride?.destination}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-3">
          <GiTakeMyMoney className="h-8 w-8" />
          <div className="text">
            <span className="text-lg font-bold">₹{ride?.fare}</span>
            <p className="text-sm capitalize">cash</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WaitingForDriver;