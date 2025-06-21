import React,{forwardRef} from "react";
import { MdPinDrop } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";

const LookingForDriver = forwardRef((props,ref) => {
  return (
    <div ref={ref} className="fixed w-full  bottom-0 bg-white z-10 px-3 py-1">
      <div className="flex  justify-center my-2">
        <div className="border-3 border-gray-300 w-1/6 rounded-full"
          onClick={() => { 
            props.setVechileFound(false);
            props.setConfirmVechilePanel(false);
          }}></div>
      </div>

      <h3 className="text-2xl capitalize font-semibold text-center">
        looking for driver
      </h3>

      {/* car image  */}
      <div className="w-full flex flex-col justify-between items-center gap-2">
        <img
          className=" h-34 w-50"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_520,w_921/v1709190311/assets/f9/453c50-4b40-4527-ac78-5d0714be3866/original/UberTaxi_16.9%281%29.png"
          alt="ride car"
        />

        {/* ride info  */}

        <div className="w-full flex flex-col">
          {/* destination address  */}

          <div className="flex items-center gap-4 px-3 py-2 border-b-4 border-gray-200 mb-3 -mt-2">
            <MdPinDrop className="h-8 w-8" />
            <div className="text">
              <h1 className="text-lg font-bold capitalize">562/11-A</h1>
              <p className="text-sm capitalize ">
                church street, bengaluru, karnatka
              </p>
            </div>
          </div>

          {/* pickup  address  */}
          <div className="flex items-center gap-4 px-3 py-2 border-b-4 border-gray-200 mb-3 -mt-2">
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

          <div className="flex items-center gap-4 px-3 py-3 border-b-4 border-gray-200 mb-3 -mt-2"
            onClick={() => props.setWaitingForDriver(true)}
          >
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

export default LookingForDriver;
