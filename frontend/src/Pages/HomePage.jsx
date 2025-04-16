import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../Context/UserContext";
import logoImg from "../assets/uber-black.png";
import {useGSAP} from '@gsap/react'
import gsap from "gsap";
import { FaChevronDown,FaChevronUp } from "react-icons/fa";

const HomePage = () => {
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [openPanel , setOpenPanel] = useState(false);
  const divRef = useRef(null);

  const data = useContext(UserContext);

  console.log("the global data is:", data);

  const submitHandler = (e) => {
    e.preventDefault();
  };


  // gsap animation 
  useGSAP(() => {
    gsap.to(divRef.current, {
      height: openPanel ? "75%" : "0%",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [openPanel]);



  return (
    <div className="h-screen relative">
      <img
        src={logoImg}
        alt="uber logo"
        className="w-16 absolute left-5 top-5"
      />

      <div className="h-screen w-screen">
        <img
          src="https://i2-prod.mylondon.news/article16106961.ece/ALTERNATES/s615/2_Uber-pink-cars.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute top-0 h-screen w-full flex flex-col justify-end">
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

        <div 
        ref={divRef}
        className="h-0 bg-amber-800"></div>

      </div>
    </div>
  );
};

export default HomePage;
