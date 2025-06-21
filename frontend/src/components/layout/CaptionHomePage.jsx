import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom'
import imageUrl from './../../assets/image/uber-black.png'
import DriverStatus from "../feature/driver/DriverStatus";
import DriverDetails from "../feature/driver/DriverDetails";
import DriverRidePopUp from "../feature/driver/DriverRidePopUp";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";




const CaptionHomePageLayout = () => {
    const [driverRideDetail,setDriverRideDetail]= useState(true);
    const [driverRidePopUp,setDriverRidePopUp] = useState(false);


    const driverRideDetailRef = useRef(null);
    const driverRidePopUpRef = useRef(null);

    console.log("driver detail panel is :",driverRideDetail)
    console.log("driver ride pop panel:",driverRidePopUp)

    // gsap animation for the popups
    useGSAP(()=>{
        if(driverRideDetail){
         gsap.to(driverRideDetailRef.current,{
             transform: "translateY(0%)",
             duration: 1,
             ease: "power2.inOut",
         })
        }else{
            gsap.to(driverRideDetailRef.current, {
                transform: "translateY(100%)",
                duration: 1,
                ease: "power2.inOut",
            })
        }
    },[driverRideDetail])


    useGSAP(() => {
        if (driverRidePopUp) {
            gsap.to(driverRidePopUpRef.current, {
                transform: "translateY(0%)",
                duration: 1,
                ease: "power2.inOut",
            })
        } else {
            gsap.to(driverRidePopUpRef.current, {
                transform: "translateY(100%)",
                duration: 1,
                ease: "power2.inOut",
            })
        }
    }, [driverRidePopUp])

  return (
      <div className="h-screen">

        <div className="fixed top-0 p-3 flex items-center justify-between w-screen">

               <img src={imageUrl} alt="app logo" className="h-10 w-16" />

              {/* caption status changed  */}
              <DriverStatus
              setDriverRideDetail={setDriverRideDetail}
              setDriverRidePopUp={setDriverRidePopUp}
              />

              {/* top bar to go to the home route  */}
              <Link to='/home-page'>
                  <FaHome className='h-12 w-12 rounded-full bg-white p-2' />
              </Link>

        </div>

         

         
          
          {/* to show the driver location and route  */}
          <div className="h-3/5">
              <img
                  src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg"
                  alt=""
                  className="h-full w-full object-cover"
              />
          </div>

          <div className="h-2/5">
              <DriverDetails
               ref={driverRideDetailRef}
              />

              <DriverRidePopUp
              ref={driverRidePopUpRef}
              />
          </div>

          


      </div>
  )
}

export default CaptionHomePageLayout