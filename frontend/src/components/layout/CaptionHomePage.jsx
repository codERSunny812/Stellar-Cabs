import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageUrl from "./../../assets/image/uber-black.png";
import DriverStatus from "../feature/driver/DriverStatus";
import DriverDetails from "../feature/driver/DriverDetails";
import DriverRidePopUp from "../feature/driver/DriverRidePopUp";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DriverRideDetail from "../feature/driver/DriverRideDetail";

const CaptionHomePageLayout = () => {
  // state variables
  const [driverRideDetail, setDriverRideDetail] = useState(true);
  const [driverRidePopUp, setDriverRidePopUp] = useState(false); // show rides when driver became active
  const [openDriverRidePanel, setOpenDriverRidePanel] = useState(false);


  const driverRideDetailRef = useRef(null);
  const driverRidePopUpRef = useRef(null);
  const driverDetailRef = useRef(null);

  // gsap animation to show the ride detail

  // animation for driver ride details container 
  useGSAP(() => {
    if (driverRideDetail) {
      gsap.to(driverRideDetailRef.current, {
        transform: "translateY(0%)",
        duration: 1,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(driverRideDetailRef.current, {
        transform: "translateY(100%)",
        duration: 1,
        ease: "power2.inOut",
      });
    }
  }, [driverRideDetail]);

  useGSAP(() => {
    if (driverRidePopUp) {
      gsap.to(driverRidePopUpRef.current, {
        transform: "translateY(0%)",
        duration: 1,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(driverRidePopUpRef.current, {
        transform: "translateY(100%)",
        duration: 1,
        ease: "power2.inOut",
      });
    }
  }, [driverRidePopUp]);

  useGSAP(() => {
    gsap.to(driverDetailRef.current, {
      height: openDriverRidePanel ? "75%" : "50%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [openDriverRidePanel]);

  return (
    <div className="h-screen relative">



        {/* driver  navbar  */}
        <div className="fixed top-0 p-3 mx-3 flex gap-2.5 items-center justify-between w-full">
          <div className="w-1/5 flex items-center justify-center ">
          <img src={imageUrl} alt="app logo" className="h-10 w-16" />
          </div>

          {/* caption status changed  */}
        <div className="w-3/5">
          <DriverStatus
            setDriverRideDetail={setDriverRideDetail}
            setDriverRidePopUp={setDriverRidePopUp}
          />
          </div>

        <div className="w-1/5 flex items-center justify-center">
          <Link to="/caption/home-page">
            <FaHome className="h-10 w-10 rounded-full bg-white p-2" />
          </Link>
          </div>

          
        </div>

       {/* middle image  */}
        <img
          src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg"
          alt=""
          className="h-full w-full object-cover"
        />


       {/* end  container for driver detail  */}
        <div
          ref={driverDetailRef}
          className="absolute bottom-0 w-full  bg-white"
        >

          {/* driver over all detail  */}
          <DriverDetails ref={driverRideDetailRef} />

            {/* when driver is active  */}
           <DriverRidePopUp
            ref={driverRidePopUpRef}
            setDriverRideDetail={setDriverRideDetail}
            setDriverRidePopUp={setDriverRidePopUp}
            setOpenDriverRidePanel={setOpenDriverRidePanel}
          /> 

          {
          openDriverRidePanel && <DriverRideDetail />
          }

          
        </div>
      </div>

    // </div>
  );
};

export default CaptionHomePageLayout;
