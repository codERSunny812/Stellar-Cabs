import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { forwardRef, useRef, useState } from "react";
import { PiCarProfileFill } from "react-icons/pi";

const DriverStatus = forwardRef((props,ref) => {
    const [driverStatus,setDriverStatus] = useState(false);
    const carIconRef = useRef(null);

    useGSAP(()=>{
        if (driverStatus) {
            gsap.to(carIconRef.current, {
                x:100,
                duration:1,
                ease: "power4.Out",
            })
        } else {
            gsap.to(carIconRef.current, {
                x: 0, 
                duration:1,
                ease: "power4.Out",
            })
          }
    },[driverStatus])

    const carIconClick = ()=>{
        if(driverStatus){
         setDriverStatus(false);
         props.setDriverRidePopUp(false);
         props.setDriverRideDetail(true);   
        }else{
        setDriverStatus(true);
        props.setDriverRideDetail(false);
        props.setDriverRidePopUp(true);
        }
    }
  return (
      <div ref={ref} className={`rounded-full flex items-center gap-1.5  ${driverStatus ? "bg-green-500" : "bg-gray-100"} border-none outline-none py-1`}>
         {
        driverStatus && <p className="capitalize px-2 font-medium text-white text-base">online</p>
         }
        <PiCarProfileFill ref={carIconRef}   className="bg-black rounded-full p-1.5 h-9 w-9 text-white" onClick={carIconClick}/>
        {
        !driverStatus && <p className="capitalize px-2 font-medium text-black text-base">offline</p>
        }
        
        
    </div>
  )
})

export default DriverStatus