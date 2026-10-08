import { forwardRef } from "react";
import { MdPinDrop } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { getVehicle } from "../utils/vechiles";

const LookingForDriver = forwardRef(({ ride }, ref) => {
  const vehicle = getVehicle(ride?.vehicleType);

  return (
    <div ref={ref} className="fixed w-full bottom-0 bg-white z-10 px-3 py-3">
      <h3 className="text-2xl capitalize font-semibold text-center">
        looking for a driver
      </h3>

      {/* chalti hui patti, taaki pata chale ki dhoondh rahe hain */}
      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden my-4">
        <div className="h-full w-1/2 bg-black animate-pulse"></div>
      </div>

      <div className="w-full flex flex-col justify-between items-center gap-2">
        {vehicle && <vehicle.icon className="h-20 w-28 text-gray-800" />}

        <div className="w-full flex flex-col">
          {/* pickup */}
          <div className="flex items-center gap-4 px-3 py-2 border-b-4 border-gray-200 mb-3">
            <MdPinDrop className="h-8 w-8" />
            <div className="text">
              <h1 className="text-sm font-bold uppercase text-gray-500">pickup</h1>
              <p className="text-base capitalize">{ride?.pickup}</p>
            </div>
          </div>

          {/* drop */}
          <div className="flex items-center gap-4 px-3 py-2 border-b-4 border-gray-200 mb-3 -mt-2">
            <FaLocationDot className="h-7 w-7" />
            <div className="text">
              <h1 className="text-sm font-bold uppercase text-gray-500">drop</h1>
              <p className="text-base capitalize">{ride?.destination}</p>
            </div>
          </div>

          {/* price */}
          <div className="flex items-center gap-4 px-3 py-3 mb-2 -mt-2">
            <GiTakeMyMoney className="h-8 w-8" />
            <div className="text">
              <span className="text-lg font-bold">₹{ride?.fare}</span>
              <p className="text-sm capitalize">cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LookingForDriver;