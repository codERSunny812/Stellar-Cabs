import { forwardRef } from "react";
import { MdPinDrop } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { getVehicle } from "../utils/vechiles";

const ConfirmedVechile = forwardRef(
  ({ fareData, vehicleType, onConfirm, onClose, loading }, ref) => {
    const vehicle = getVehicle(vehicleType);
    const fare = fareData?.fares?.[vehicleType];

    return (
      <div ref={ref} className="fixed w-full bottom-0 bg-white z-10 px-3 py-2">
        <div className="flex justify-center">
          <div
            className="border-3 border-gray-300 w-1/6 rounded-full mb-3"
            onClick={onClose}
          ></div>
        </div>

        <h3 className="text-2xl capitalize font-semibold text-center">
          confirm your ride
        </h3>

        <div className="w-full flex flex-col justify-between items-center">
          {/* chuni hui gaadi */}
          {vehicle && (
            <div className="flex flex-col items-center my-3">
              <vehicle.icon className="h-20 w-28 text-gray-800" />
              <p className="capitalize font-semibold">{vehicle.name}</p>
            </div>
          )}

          <div className="w-full flex flex-col">
            {/* pickup */}
            <div className="flex items-center gap-2 px-3 py-2 border-b-4 border-gray-200 mb-3">
              <MdPinDrop className="h-8 w-8" />
              <div className="text">
                <h1 className="text-sm font-bold uppercase text-gray-500">pickup</h1>
                <p className="text-base capitalize">{fareData?.pickup}</p>
              </div>
            </div>

            {/* drop */}
            <div className="flex items-center gap-2 px-3 py-1 border-b-4 border-gray-200 mb-3 -mt-2">
              <FaLocationDot className="h-6 w-6" />
              <div className="text">
                <h1 className="text-sm font-bold uppercase text-gray-500">drop</h1>
                <p className="text-base capitalize">{fareData?.destination}</p>
              </div>
            </div>

            {/* price */}
            <div className="flex items-center gap-4 px-3 py-1 mb-2 -mt-2">
              <GiTakeMyMoney className="h-8 w-8" />
              <div className="text">
                <span className="text-lg font-bold">₹{fare ?? "--"}</span>
                <p className="text-sm capitalize">cash</p>
              </div>
            </div>
          </div>
        </div>

        {/* confirm button */}
        <div className="confirm-vechile w-full">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="bg-black text-white w-full py-3 rounded-lg capitalize text-lg disabled:opacity-60"
          >
            {loading ? "booking..." : "confirm ride"}
          </button>
        </div>
      </div>
    );
  }
);

export default ConfirmedVechile;