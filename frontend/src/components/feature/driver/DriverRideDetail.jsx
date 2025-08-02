import { IoIosArrowRoundBack } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import Button from "../../common/Button";



const ActionButton = [
    {
        icon: IoCall ,
        text:"call"
    },
    {
        icon:FaMessage,
        text:"message"
    },
    {
        icon: FcCancel,
        text: "cancel"
    }
]
const DriverRideDetail = () => {
  return (
      <div className="flex flex-col bg-gray-300">

        {/* top part of this panel  */}

        <div className="flex items-center gap-12">
              <IoIosArrowRoundBack className="h-10 w-12" />
              <h3 className="mx-18 font-semibold">#123456</h3>
        </div>

        <div className="border-2 border-gray-600">
        </div>

        {/* customer user info  */}

        <div className="riderInfo flex items-center justify-between  py-1 px-2 rounded-lg mt-2">
            <div className="riderData flex items-center px-3 gap-5">
                  <img src="https://xsgames.co/randomusers/assets/avatars/male/74.jpg" alt="rider image" className="h-12 w-12 rounded-lg" />
                <h3 className="text-xl font-medium capitalize">sunny</h3>

            </div>

            <div className="fareAmount text-lg font-semibold px-3">
            ₹500
            </div>
        </div>


        {/* customer  ride information */}
        <div className="mt-1 bg-white">
            <div className="pickup py-1 px-3">
                <h2 className="text-lg uppercase text-gray-500 font-semibold">pickup</h2>
                <h4 className="text-base capitalize">Saharaganj mall, Lucknow</h4>
            </div>

            

              <div className="drop py-1 px-3">
                  <h2 className="text-lg uppercase text-gray-500 font-semibold">drop</h2>
                  <h4 className="text-base capitalize">gomtinagar, Lucknow</h4>
              </div>


              <div className="tripFare py-1 px-3">
                  <h3 className="text-xl text-gray-500 uppercase font-semibold">trip fare</h3>
                  <div className="flex items-center justify-between capitalize">
                    <h3>base fare</h3>
                    <h4>₹545</h4>
                  </div>

                  <div className="flex items-center justify-between capitalize">
                      <h3>discount</h3>
                      <h4>₹65</h4>
                  </div>

                  <div className="flex items-center justify-between capitalize">
                      <h3>paid</h3>
                      <h4>₹500</h4>
                  </div>
              </div>

              {/* action button */}
              <div className="flex items-center justify-around mt-4 mb-2">
                {
                 ActionButton.map((data,key)=>{
                    const Icon = data.icon;
                    return(
                        <div className="flex items-center flex-col" key={key}>
                            <Icon className="h-12 w-12 bg-gray-300 p-3 rounded-full"/>
                            <p className="text-base ">{data.text}</p>
                        </div>
                    )
                 })
                }
              </div>



        </div>

        {/* end button section  */}

        <div className="w-full">
            <button className="py-4 px-5 bg-amber-400 w-full text-lg text-white font-semibold capitalize">
                go to the ride
            </button>
        </div>
     
        

       
    </div>
    
  )
}

export default DriverRideDetail