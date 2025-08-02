import { HiStatusOnline } from "react-icons/hi";
import { BsFillCarFrontFill } from "react-icons/bs";
import { FaAngellist } from "react-icons/fa";
import { forwardRef } from "react";



const userInsight = [
    {
        icon: HiStatusOnline,
        text: "total online",
        info: "14h"
    },
    {
        icon: BsFillCarFrontFill,
        text: "total ride",
        info: "40km"


    },
    {
        icon: FaAngellist,
        text: "total earning",
        info: "₹1000"
    }
]

const DriverDetails = forwardRef((props,ref) => {
  return (
      <div className="h-2/5 p-6 fixed bottom-0  w-full  mb-8" ref={ref}>
          {/* caption information  */}
          <div className="captionInfo  flex items-center justify-between mt-2">

              <div className="userInfo flex items-center justify-start gap-3">
                  <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png" alt="user image" className="h-15 w-15 rounded-full object-cover" />
                  <h4 className="text-lg font-medium">Sunny Pandey</h4>

              </div>

              <div>
                  <h4 className="text-xl font-semibold">₹299</h4>
                  <p className="text-sm font-medium text-gray-600 capitalize">earned</p>
              </div>

          </div>

          {/* caption  insight  */}

          <div className="bg-gray-300 flex items-center justify-between mt-5 p-5 rounded-3xl w-full">
              {
                  userInsight.map((data, key) => {
                      const Icon = data.icon;
                      return (
                          <div className=" flex flex-col gap-1 items-center justify-center capitalize" key={key}>
                              <Icon className="h-7 w-7" />
                              <h3 className="font-semibold">{data.info}</h3>
                              <h4 className="font-thin text-base">{data.text}</h4>
                          </div>
                      )
                  })
              }

          </div>

      </div>
  )
})

export default DriverDetails