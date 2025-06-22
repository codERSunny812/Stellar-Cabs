import { forwardRef } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdPinDrop } from "react-icons/md";
import Button from "../../common/Button";

const DriverRidePopUp = forwardRef(({ setDriverRideDetail, setDriverRidePopUp, setOpenDriverRidePanel },ref) => {
  return (
    <div className="h-2/5 py-5 px-4 fixed bottom-0 w-full" ref={ref}>
      <h1 className="text-center capitalize text-xl font-semibold">
        a new ride is available
      </h1>

      {/* user info */}
      <div className="userInfo  flex items-center justify-between mt-5 py-2 px-4 bg-amber-300 rounded-2xl">
        <div className="userDetail flex  gap-2 items-center">
          <img
            src="https://xsgames.co/randomusers/assets/avatars/male/74.jpg"
            alt="user image"
            className="h-15 w-15 rounded-full"
          />
          <h3 className="text-lg capitalize font-semibold">sushil pandey</h3>
        </div>

        <div className="userDistance">
          <h3 className="font-semibold">5 km</h3>
        </div>
      </div>

      {/* user location info  */}
      <div className="mt-3">
        <div className="flex items-center gap-2 px-3 py-2 border-b-4 border-gray-200 mb-3">
          <MdPinDrop className="h-8 w-8" />
          <div className="text">
            <h1 className="text-lg font-bold capitalize">562/11-A</h1>
            <p className="text-sm capitalize ">
              church street, bengaluru, karnatka
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 border-b-4 border-gray-200 mb-3 -mt-2">
          <FaLocationDot className="h-6 w-6" />
          <div className="text">
            <h1 className="text-lg font-bold capitalize">
              Third wave, coffe shop
            </h1>
            <p className="text-sm capitalize">
              cubbon road, bengaluru, karnatka
            </p>
          </div>
        </div>
      </div>

      {/* rider button  */}

      <div className="button  flex items-center justify-between mb-10">
        <Button text="ignore" setDriverRidePopUp={setDriverRidePopUp}  />
        <Button text="accept" setOpenDriverRidePanel={setOpenDriverRidePanel}
        setDriverRidePopUp={setDriverRidePopUp}
         />
      </div>


    </div>
  );
});

export default DriverRidePopUp;
