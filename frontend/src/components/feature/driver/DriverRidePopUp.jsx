import { forwardRef } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdPinDrop } from "react-icons/md";

const DriverRidePopUp = forwardRef(({ ride, onIgnore, onAccept }, ref) => {
  // user model mein firstname/lastname chhote letters mein hai
  const userName = ride
    ? `${ride.user?.fullName?.firstname ?? ""} ${ride.user?.fullName?.lastname ?? ""}`
    : "";
  const distanceKm = ride?.distance ? (ride.distance / 1000).toFixed(1) : "-";

  return (
    <div className="h-1/2 py-5 px-4 fixed bottom-0 w-full mb-2" ref={ref}>
      <h1 className="text-center capitalize text-lg font-semibold">
        a new ride is available
      </h1>

      {/* user info */}
      <div className="userInfo flex items-center justify-between mt-5 py-1 px-4 bg-amber-300 rounded-2xl">
        <div className="userDetail flex gap-2 items-center">
          <img
            src="https://xsgames.co/randomusers/assets/avatars/male/74.jpg"
            alt="user image"
            className="h-10 w-10 rounded-full"
          />
          <h3 className="text-base capitalize font-semibold">{userName}</h3>
        </div>

        <div className="userDistance">
          <h3 className="font-semibold text-base">{distanceKm} km</h3>
        </div>
      </div>

      {/* location info */}
      <div className="mt-3">
        <div className="flex items-center gap-2 px-3 py-2 border-b-4 border-gray-200 mb-3">
          <MdPinDrop className="h-5 w-5" />
          <div className="text">
            <h1 className="text-sm font-bold uppercase text-gray-500">pickup</h1>
            <p className="text-base capitalize">{ride?.pickup}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 border-b-4 border-gray-200 mb-3 -mt-2">
          <FaLocationDot className="h-5 w-5" />
          <div className="text">
            <h1 className="text-sm font-bold uppercase text-gray-500">drop</h1>
            <p className="text-base capitalize">{ride?.destination}</p>
          </div>
        </div>

        <div className="flex items-center justify-between px-3 mb-3">
          <span className="text-gray-600 capitalize">fare</span>
          <span className="text-lg font-semibold">₹{ride?.fare}</span>
        </div>
      </div>

      {/* buttons */}
      <div className="flex items-center justify-between mb-1">
        <button
          onClick={onIgnore}
          className="bg-gray-500 px-10 py-2 rounded-lg text-white font-semibold capitalize"
        >
          ignore
        </button>
        <button
          onClick={onAccept}
          className="bg-green-500 px-10 py-2 rounded-lg text-white font-semibold capitalize"
        >
          accept
        </button>
      </div>
    </div>
  );
});

export default DriverRidePopUp;