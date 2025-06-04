import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../Context/UserContext";
import logoImg from "../assets/uber-black.png";
import {useGSAP} from '@gsap/react'
import gsap from "gsap";
import { FaChevronDown,FaChevronUp,FaUser } from "react-icons/fa";
import LocationSearchPanel from "../components/LocationSearchPanel";
import ShowCabs from "../components/ShowCabs";
import ConfirmedVechile from "../components/ConfirmedVechile";
import WaitingForDriver from "../components/WaitingForDriver";
import LookingForDriver from "../components/LookingForDriver";

const HomePage = () => {
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [openPanel , setOpenPanel] = useState(false);
  const[vechilePanel , setVechilePanel] = useState(false);
  const [confirmVechilePanel , setConfirmVechilePanel] = useState(false);
  const [vechileFound , setVechileFound] = useState(false);


  const confirmVechilePanelRef = useRef(null);
  const vechilePanelRef = useRef(null); 
  const divRef = useRef(null);
  const vechileFoundRef = useRef(null);



  const submitHandler = (e) => {
    e.preventDefault();
  };


  // gsap animations to show popups

  // animation to show the location panel a
  useGSAP(() => {
    gsap.to(divRef.current, {
      height: openPanel ? " 75%" : "0%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [openPanel])

  useGSAP(()=>{
     if(vechilePanel){
       gsap.to(vechilePanelRef.current,{
        transform: "translateY(0%)",
        duration:1,
        ease: "power2.inOut",
       })
     }else{
        gsap.to(vechilePanelRef.current,{
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power2.inOut",
        })
     }
  },[vechilePanel])

  useGSAP(() => {
    if (confirmVechilePanel) {
      gsap.to(confirmVechilePanelRef.current, {
        transform: "translateY(0%)",
        duration: 1,
        ease: "power2.inOut",
      })
    } else {
      gsap.to(confirmVechilePanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.inOut",
      })
    }
  }, [confirmVechilePanel])

  useGSAP(() => {
    if (vechileFound) {
      gsap.to(vechileFoundRef.current, {
        transform: "translateY(0%)",
        duration: 1,
        ease: "power2.inOut",
      })
    } else {
      gsap.to(vechileFoundRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.inOut",
      })
    }
  }, [vechileFound])


  return (
    <div className="h-screen relative overflow-hidden">
      {/* top logo of the uber  */}
      <img
        src={logoImg}
        alt="uber logo"
        className="w-16 absolute left-5 top-5"
      />

      {/* background image of the uber */}
      <div className="h-screen w-screen">
        <img
          src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* bottom panel of the page  */}
      <div  className="absolute top-0 h-screen w-full flex flex-col justify-end">

        {/* location search bar component start  */}
        <div className="h-[25%] bg-white p-5 relative">
          <h4 className="text-2xl font-semibold capitalize">find your trip</h4>
          <h5 className="absolute top-5 right-6">
            {
              !openPanel ? <FaChevronUp onClick={() => setOpenPanel(true)} /> : <FaChevronDown onClick={() => setOpenPanel(false)} />
            }
         
          </h5>
          <form
            onSubmit={(e) => submitHandler(e)}
            className="flex flex-col gap-2.5"
          >
            <input
              type="text"
              value={pickUpLocation}
              onClick={()=> setOpenPanel(true)}
              onChange={(e) => setPickUpLocation(e.target.value)}
              className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-5"
              name=""
              id=""
              placeholder="enter your pickup location"
            />
            <input
              type="text"
              onClick={()=> setOpenPanel(true)}
              value={dropLocation}
              onChange={(e) => {
                setDropLocation(e.target.value);
              }}
              className="bg-[#eee] px-8 py-2 text-base rounded-lg mt-3"
              placeholder="enter your drop location"
            />
          </form>
        </div>


        {/* location search bar panel open  */}
        <div 
        ref={divRef}
        className="h-0 bg-white">
          <LocationSearchPanel 
          setVechilePanel={setVechilePanel}
          setOpenPanel={setOpenPanel}
          />
        </div>

      </div>


      {/* show cabs component which will open when user click on any location  */}
      <ShowCabs 
      ref={vechilePanelRef}
      setVechilePanel={setVechilePanel}
      setConfirmVechilePanel ={setConfirmVechilePanel}
      />


      {/* selected vechile component that is the confirm vechile component */}
      <div 
      ref={confirmVechilePanelRef} 
      className="fixed w-full  bottom-0 bg-white z-10 px-3 py-6">
        <ConfirmedVechile 
        setConfirmVechilePanel={setConfirmVechilePanel}
        setVechileFound={setVechileFound}
        />
      </div>

      {/* looking for driver component */}
      <div ref={vechileFoundRef} className="fixed w-full  bottom-0 bg-white z-10 px-3 py-6">
       <LookingForDriver/>
      </div>


     
    </div>
  );
};

export default HomePage;
