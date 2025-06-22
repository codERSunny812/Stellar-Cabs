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
  // state variable
  const [driverRideDetail, setDriverRideDetail] = useState(true);
  const [driverRidePopUp, setDriverRidePopUp] = useState(false);
  const [openDriverRidePanel, setOpenDriverRidePanel] = useState(false);

  const driverRideDetailRef = useRef(null);
  const driverRidePopUpRef = useRef(null);
  const driverRidePopUpDetailRef = useRef(null);

  // gsap animation to show the ride detail

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
    gsap.to(driverRidePopUpDetailRef.current, {
      height: openDriverRidePanel ? " 75%" : "40%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [openDriverRidePanel]);

  return (
    <div className="h-screen relative">
      {/* to show the driver location and route  */}
      <div className="h-screen">

        <div className="fixed top-0 p-3 flex items-center justify-between w-screen">
          <img src={imageUrl} alt="app logo" className="h-10 w-16" />

          {/* caption status changed  */}
          <DriverStatus
            setDriverRideDetail={setDriverRideDetail}
            setDriverRidePopUp={setDriverRidePopUp}
          />

          {/* top bar to go to the home route  */}
          <Link to="/home-page">
            <FaHome className="h-12 w-12 rounded-full bg-white p-2" />
          </Link>
        </div>

        <img
          src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg"
          alt=""
          className="h-full w-full object-cover"
        />

        <div
          ref={driverRidePopUpDetailRef}
          className="absolute bottom-0 w-full bg-white h-1/2"
        >
          <DriverDetails ref={driverRideDetailRef} />

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

    </div>
  );
};

export default CaptionHomePageLayout;
