import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logoImg from "../assets/image/uber-black.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import { toast } from "react-toastify";
import ShowCabs from "../components/ShowCabs";
import ConfirmedVechile from "../components/ConfirmedVechile";
import WaitingForDriver from "../components/WaitingForDriver";
import LookingForDriver from "../components/LookingForDriver";
import RidingPanel from "../components/RidingPanel";
import RideCompleted from "../components/RideCompleted";
import { SocketContext } from "../Context/SocketContext";
import RideChat from "../components/common/RideChat";
import LiveMap from "../components/common/LiveMap";
import { useRideChat } from "../hooks/useRideChat";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// har request ke saath user ka token
const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const HomePage = () => {
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [vechilePanel, setVechilePanel] = useState(false);
  const [confirmVechilePanel, setConfirmVechilePanel] = useState(false);
  const [vechileFound, setVechileFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [riding, setRiding] = useState(false); // ride chal rahi hai
  const [rideCompleted, setRideCompleted] = useState(false); // ride khatam

  const [user, setUser] = useState(null); // logged-in user
  const [fareData, setFareData] = useState(null); // { fares, distance, duration, pickup, destination }
  const [selectedVehicle, setSelectedVehicle] = useState(null); // car / bike / auto
  const [loadingFare, setLoadingFare] = useState(false);
  const [ride, setRide] = useState(null); // bani hui ride (OTP ke saath)
  const [creatingRide, setCreatingRide] = useState(false);

  const [nearbyCaptains, setNearbyCaptains] = useState([]); // map par dikhne wale drivers
  const [hasLocation, setHasLocation] = useState(false);
  const userPositionRef = useRef(null);

  const { socket } = useContext(SocketContext);

  // driver se chat (accept hone ke baad)
  const chat = useRideChat(socket, ride?._id);

  const confirmVechilePanelRef = useRef(null);
  const vechilePanelRef = useRef(null);
  const vechileFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const ridingRef = useRef(null);
  const rideCompletedRef = useRef(null);

  // page khulte hi user ki profile lao
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resp = await axios.get(`${BASE_URL}/users/profile`, authHeaders());
        setUser(resp.data.data);
      } catch (error) {
        console.log("user profile error:", error);
      }
    };

    fetchProfile();
  }, []);

  // map se user ki location aati hai
  const handleLocation = useCallback((position) => {
    userPositionRef.current = position;
    setHasLocation(true);
  }, []);

  // location milte hi aur phir har 10 second mein paas ke drivers lao
  useEffect(() => {
    if (!hasLocation) return;

    const fetchNearbyCaptains = async () => {
      const [lat, lng] = userPositionRef.current;
      try {
        const resp = await axios.get(`${BASE_URL}/rides/nearby-captains`, {
          params: { lat, lng },
          ...authHeaders(),
        });
        setNearbyCaptains(resp.data.captains);
      } catch (error) {
        console.log("nearby captains error:", error);
      }
    };

    fetchNearbyCaptains();
    const intervalId = setInterval(fetchNearbyCaptains, 10000);
    return () => clearInterval(intervalId);
  }, [hasLocation]);

  // user ka data aate hi server ko batao ki yeh socket kiska hai
  useEffect(() => {
    if (user?._id) {
      socket.emit("join", { userId: user._id, userType: "user" });
    }
  }, [user]);

  // driver ne ride accept ki
  useEffect(() => {
    const handleRideConfirmed = (confirmedRide) => {
      // OTP sirf ride banate waqt mila tha, use sambhal kar rakho
      setRide((prev) => ({ ...confirmedRide, otp: prev?.otp }));
      setVechileFound(false);
      setWaitingForDriver(true);
      toast.success("driver found!");
    };

    socket.on("ride-confirmed", handleRideConfirmed);
    return () => socket.off("ride-confirmed", handleRideConfirmed);
  }, []);

  // driver ne ride cancel ki
  useEffect(() => {
    const handleRideCancelled = () => {
      setWaitingForDriver(false);
      setVechileFound(false);
      setRide(null);
      chat.closeChat();
      toast.error("driver cancelled the ride, please book again");
    };

    socket.on("ride-cancelled", handleRideCancelled);
    return () => socket.off("ride-cancelled", handleRideCancelled);
  }, [chat.closeChat]);

  // driver ne sahi OTP daala: ride shuru
  useEffect(() => {
    const handleRideStarted = (startedRide) => {
      setRide((prev) => ({ ...startedRide, otp: prev?.otp }));
      setWaitingForDriver(false);
      setRiding(true);
      toast.success("ride started, enjoy your trip!");
    };

    socket.on("ride-started", handleRideStarted);
    return () => socket.off("ride-started", handleRideStarted);
  }, []);

  // driver ne ride khatam ki
  useEffect(() => {
    const handleRideEnded = (endedRide) => {
      setRide(endedRide);
      setRiding(false);
      setRideCompleted(true);
      chat.closeChat();
    };

    socket.on("ride-ended", handleRideEnded);
    return () => socket.off("ride-ended", handleRideEnded);
  }, [chat.closeChat]);

  // "done" dabane par sab saaf, nayi ride ke liye taiyaar
  const handleRideDone = () => {
    setRideCompleted(false);
    setRide(null);
    setFareData(null);
    setSelectedVehicle(null);
    setPickUpLocation("");
    setDropLocation("");
  };

  // pickup aur drop daalkar "find ride" dabane par kiraya lao
  const submitHandler = async (e) => {
    e.preventDefault();

    if (pickUpLocation.trim().length < 3 || dropLocation.trim().length < 3) {
      toast.error("please enter pickup and drop location");
      return;
    }

    try {
      setLoadingFare(true);
      const resp = await axios.get(`${BASE_URL}/rides/get-fare`, {
        params: { pickup: pickUpLocation, destination: dropLocation },
        ...authHeaders(),
      });

      // jis pickup/drop ka kiraya aaya, wahi saath mein rakho
      setFareData({ ...resp.data, pickup: pickUpLocation, destination: dropLocation });
      setVechilePanel(true);
    } catch (error) {
      console.log("fare error:", error);
      toast.error(error.response?.data?.message || "could not get fare");
    } finally {
      setLoadingFare(false);
    }
  };

  // gaadi chunne par confirm panel kholo
  const handleSelectVehicle = (vehicleType) => {
    setSelectedVehicle(vehicleType);
    setVechilePanel(false);
    setConfirmVechilePanel(true);
  };

  // "confirm ride" dabane par asli ride banao
  const handleConfirmRide = async () => {
    try {
      setCreatingRide(true);
      const resp = await axios.post(
        `${BASE_URL}/rides/create`,
        {
          pickup: fareData.pickup,
          destination: fareData.destination,
          vehicleType: selectedVehicle,
        },
        authHeaders()
      );

      setRide(resp.data.ride);
      setConfirmVechilePanel(false);
      setVechileFound(true);

      if (resp.data.notifiedCaptains === 0) {
        toast.info("no drivers online right now, please wait");
      }
    } catch (error) {
      console.log("create ride error:", error);
      toast.error(error.response?.data?.message || "could not book ride");
    } finally {
      setCreatingRide(false);
    }
  };

  // gsap animations to show popups
  // yPercent panel ki height ke hisaab se chalta hai, isliye content badhne par bhi panel poora chhupa rehta hai
  useGSAP(() => {
    gsap.to(vechilePanelRef.current, {
      yPercent: vechilePanel ? 0 : 100, // apni height ka 100% neeche = chhupa hua
      duration: vechilePanel ? 1 : 0.5,
      ease: "power2.inOut",
    });
  }, [vechilePanel]);

  useGSAP(() => {
    gsap.to(confirmVechilePanelRef.current, {
      yPercent: confirmVechilePanel ? 0 : 100, // apni height ka 100% neeche = chhupa hua
      duration: confirmVechilePanel ? 1 : 0.5,
      ease: "power2.inOut",
    });
  }, [confirmVechilePanel]);

  useGSAP(() => {
    gsap.to(vechileFoundRef.current, {
      yPercent: vechileFound ? 0 : 100, // apni height ka 100% neeche = chhupa hua
      duration: vechileFound ? 1 : 0.5,
      ease: "power2.inOut",
    });
  }, [vechileFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      yPercent: waitingForDriver ? 0 : 100, // apni height ka 100% neeche = chhupa hua
      duration: waitingForDriver ? 1 : 0.5,
      ease: "power2.inOut",
    });
  }, [waitingForDriver]);

  useGSAP(() => {
    gsap.to(ridingRef.current, {
      yPercent: riding ? 0 : 100, // apni height ka 100% neeche = chhupa hua
      duration: riding ? 1 : 0.5,
      ease: "power2.inOut",
    });
  }, [riding]);

  useGSAP(() => {
    gsap.to(rideCompletedRef.current, {
      yPercent: rideCompleted ? 0 : 100, // apni height ka 100% neeche = chhupa hua
      duration: rideCompleted ? 1 : 0.5,
      ease: "power2.inOut",
    });
  }, [rideCompleted]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img src={logoImg} alt="uber logo" className="w-16 absolute left-5 top-5 z-10" />

      {/* account page ka button */}
      <Link to="/user/account" className="absolute right-5 top-4 z-10">
        <FaUserCircle className="h-10 w-10 bg-white rounded-full text-gray-800" />
      </Link>

      {/* live map: user ki jagah aur paas ke drivers */}
      <div className="h-[65vh] w-full relative z-0">
        <LiveMap markers={nearbyCaptains} onLocation={handleLocation} />
      </div>

      {/* pointer-events-none: khaali hisse par click neeche map tak jaaye */}
      <div className="absolute top-0 h-screen w-full flex flex-col justify-end pointer-events-none">
        {/* location search form */}
        <div className="bg-white p-5 pointer-events-auto">
          <h4 className="text-2xl font-semibold capitalize">find your trip</h4>
          <p className="text-sm text-gray-500 mt-1">
            {nearbyCaptains.length > 0
              ? `${nearbyCaptains.length} driver${nearbyCaptains.length > 1 ? "s" : ""} nearby`
              : "no drivers nearby right now"}
          </p>

          <form onSubmit={submitHandler} className="flex flex-col gap-2.5">
            <input
              type="text"
              value={pickUpLocation}
              onChange={(e) => setPickUpLocation(e.target.value)}
              className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-5"
              placeholder="enter your pickup location"
            />
            <input
              type="text"
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              className="bg-[#eee] px-8 py-2 text-base rounded-lg mt-3"
              placeholder="enter your drop location"
            />
            <button
              type="submit"
              disabled={loadingFare}
              className="bg-black text-white py-3 rounded-lg mt-3 text-lg font-semibold capitalize disabled:opacity-60"
            >
              {loadingFare ? "finding fares..." : "find ride"}
            </button>
          </form>
        </div>
      </div>

      <ShowCabs
        ref={vechilePanelRef}
        fareData={fareData}
        onSelect={handleSelectVehicle}
        setVechilePanel={setVechilePanel}
      />

      <ConfirmedVechile
        ref={confirmVechilePanelRef}
        fareData={fareData}
        vehicleType={selectedVehicle}
        onConfirm={handleConfirmRide}
        onClose={() => setConfirmVechilePanel(false)}
        loading={creatingRide}
      />

      <LookingForDriver ref={vechileFoundRef} ride={ride} />

      <WaitingForDriver
        ref={waitingForDriverRef}
        ride={ride}
        onMessage={chat.openChat}
        unread={chat.unread}
      />

      <RidingPanel
        ref={ridingRef}
        ride={ride}
        onMessage={chat.openChat}
        unread={chat.unread}
      />

      <RideCompleted ref={rideCompletedRef} ride={ride} onDone={handleRideDone} />

      {/* driver se chat */}
      {chat.isOpen && ride?.captain && (
        <RideChat
          title={`${ride.captain.fullName?.firstName ?? ""} ${ride.captain.fullName?.lastName ?? ""}`}
          me="user"
          messages={chat.messages}
          onSend={chat.sendMessage}
          onClose={chat.closeChat}
        />
      )}
    </div>
  );
};

export default HomePage;