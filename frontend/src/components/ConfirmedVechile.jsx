import { forwardRef } from 'react'
import { MdPinDrop } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";

const ConfirmedVechile = forwardRef((props,ref) => {
  return (
      <div ref={ref} className="fixed w-full  bottom-0 bg-white z-10 px-3 py-6">
      <div className="flex  justify-center">
        <div className="border-3 border-gray-300 w-1/6 rounded-full mb-4"
          onClick={() => props.setVechileFound(false)}></div>
      </div>

      <h3 className="text-2xl capitalize font-semibold text-center">
        confirm your ride
      </h3>

      {/* car image  */}
      <div className="w-full flex flex-col justify-between items-center">

        <img
          className=' h-50 w-54'
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_520,w_921/v1709190311/assets/f9/453c50-4b40-4527-ac78-5d0714be3866/original/UberTaxi_16.9%281%29.png" alt="ride car" />

        {/* ride info  */}

        <div className="w-full flex flex-col gap-2">

          {/* destination address  */}

          <div className="flex items-center gap-4 px-3 py-2 border-b-4 border-gray-200 mb-3">
            <MdPinDrop className='h-8 w-8' />
            <div className="text">
              <h1 className='text-xl font-bold capitalize'>562/11-A</h1>
              <p className='text-base capitalize '>church street, bengaluru, karnatka</p>
            </div>
          </div>

          {/* pickup  address  */}
          <div className="flex items-center gap-4 px-3 py-2 border-b-4 border-gray-200 mb-3">
            <FaLocationDot className='h-7 w-7' />
            <div className="text">
              <h1 className='text-xl font-bold capitalize'>Third wave, coffe shop</h1>
              <p className='text-sm capitalize' >cubbon road, bengaluru, karnatka</p>
            </div>
          </div>


          {/* price  */}

          <div className="flex items-center gap-4 px-3 py-3 border-b-4 border-gray-200 mb-3">
            <GiTakeMyMoney className='h-8 w-8' />
            <div className="text">
              <span className='text-xl font-bold'>₹198.22</span>
              <p className='text-sm capitalize' >cash cash</p>
            </div>

          </div>



        </div>



      </div>


      {/* confirm button  */}

      <div className="confirm-vechile w-full mb-4">
        <button
          onClick={() => {
            props.setConfirmVechilePanel(false);
            props.setVechileFound(true);
          }
          }
          className='bg-black text-white w-full py-4 rounded-lg capitalize text-lg'>confirm ride</button>
      </div>
      </div>
  )
})

export default ConfirmedVechile