import React from 'react'
import { MdPinDrop } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";

const ConfirmedVechile = (props) => {
  return (
    <>
      <div className="flex  justify-center">
        <div className="border-3 border-gray-300 w-1/6 rounded-full mb-4" 
         onClick={() => props.setConfirmVechilePanel(false)}></div>
              </div>
    
              <h3 className="text-2xl capitalize font-semibold text-center">
                  confirm your ride
              </h3>

              {/* car image  */}
        <div className="w-full flex flex-col justify-between items-center gap-2">

        <img 
        className='h-52 w-52'
        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_520,w_921/v1709190311/assets/f9/453c50-4b40-4527-ac78-5d0714be3866/original/UberTaxi_16.9%281%29.png" alt="ride car" />

        {/* ride info  */}

        <div className="w-full flex flex-col gap-2">

          {/* destination address  */}

          <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-gray-500 mb-3">
            <MdPinDrop className='h-8 w-8'/>
            <div className="text">
              <h1 className='text-xl font-bold capitalize'>562/11-A</h1>
              <p className='text-base capitalize '>church street, bengaluru, karnatka</p>
            </div>
          </div>

            {/* pickup  address  */}
          <div className="flex items-center gap-4 px-3 py-2 border-b-2 border-gray-500 mb-3">
            <FaLocationDot className='h-7 w-7' />
              <div className="text">
              <h1 className='text-xl font-bold capitalize'>Third wave, coffe shop</h1>
              <p className='text-base capitalize' >cubbon road, bengaluru, karnatka</p>
              </div>
          </div>


              {/* price  */}

            <div className="flex items-center gap-4 px-3 py-3 border-b-2 border-gray-500 mb-3">
               <GiTakeMyMoney className='h-8 w-8'/>
                <span className='text-2xl font-bold'>₹198.22</span>
              </div>

        
         
        </div>



         </div>


         {/* confirm button  */}

         <div className="confirm-vechile w-full my-2">
          <button className='bg-black text-white w-full py-4 rounded-lg capitalize text-lg'>confirm ride</button>
         </div>

             
    </>
  )
}

export default ConfirmedVechile