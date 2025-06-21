import React from 'react'
import { MdPinDrop } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import {Link} from 'react-router-dom'

const BookedRide = () => {
  return (
    <div className="h-screen">
        {/* top bar to go to the home route  */}
        <Link to='/home-page' className="bg-none fixed right-2 top-3">
              <FaHome className='h-12 w-12 rounded-full bg-white p-2' />
        </Link>
        {/* to show the driver location and route  */}
        <div className="h-3/5">
              <img
                  src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg"
                  alt=""
                  className="h-full w-full object-cover"
              />
        </div>

        <div className="h-2/5">
            
                  {/* driver info $ ride info  */}
                  <div className="w-full mt-9 px-2">
                    {/* driver info  */}
            
                    <div className="w-full  flex justify-between">
                      {/* driver and car image  */}
                      <div className="driverImage flex ">            
                        <img
                          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_1152/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/BlackSUV.png"
                          className="h-20 w-26 rounded-full"
                          alt=""
                        />
                      </div>
            
                      <div className="uppercase">
                        <h3 className="text-end font-semibold text-base text-gray-500">
                          sunny
                        </h3>
                        <h2 className="text-end font-semibold text-2xl">UP 32 BC 0001</h2>
                        <h4 className="text-end font-semibold text-sm text-gray-500">
                          White Suzuki S-Presso LXI
                        </h4>
                      </div>
                    </div>
            
                    {/* location info  */}
                    <div className="w-full flex flex-col gap-2 mt-8">        
                      {/* drop  address  */}
                      <div className="flex items-center gap-4 px-3 py-1 border-b-4 border-gray-200 mb-3">
                        <FaLocationDot className="h-7 w-7" />
                        <div className="text">
                          <h1 className="text-xl font-bold capitalize">
                            Third wave, coffe shop
                          </h1>
                          <p className="text-sm capitalize">
                            cubbon road, bengaluru, karnatka
                          </p>
                        </div>
                      </div>
            
                      {/* price  */}
            
                      <div className="flex items-center gap-4 px-3 py-1 border-b-4 border-gray-200">
                        <GiTakeMyMoney className="h-8 w-8" />
                        <div className="text">
                          <span className="text-xl font-bold">₹198.22</span>
                          <p className="text-sm capitalize">cash cash</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="
                  w-full flex items-center justify-center mt-4">

                  <button className='bg-green-700 py-4 px-6 text-center font-semibold rounded-2xl w-2/3 text-white'>
                    Make a payment
                  </button>

                  </div>

        </div>

    </div>
  )
}

export default BookedRide