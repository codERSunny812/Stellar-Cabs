import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageUrl from "./../../assets/image/uber-black.png";
import DriverStatus from "../feature/driver/DriverStatus";
import DriverDetails from "../feature/driver/DriverDetails";
import DriverRidePopUp from "../feature/driver/DriverRidePopUp";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DriverRideDetail from "../feature/driver/DriverRideDetail";
import axios from "axios";
import { toast } from "react-toastify";
import { SocketContext } from "../../Context/SocketContext";
import LiveMap from "../common/LiveMap";
import RideChat from "../common/RideChat";
import { useRideChat } from "../../hooks/useRideChat";

const CaptionHomePageLayout = () => {
  // state variables
  const [driverRideDetail, setDriverRideDetail] = useState(true);
  const [driverRidePopUp, setDriverRidePopUp] = useState(false);
  const [openDriverRidePanel, setOpenDriverRidePanel] = useState(false);
  const [captain, setCaptain] = useState(null);
  const [stats, setStats] = useState(null);
  const [newRide, setNewRide] = useState(null); // popup wali ride
  const [acceptedRide, setAcceptedRide] = useState(null); // accept ki hui ride
  const [rideActionLoading, setRideActionLoading] = useState(false); // start/finish chal raha hai

  const { socket } = useContext(SocketContext);

  // accept ki hui ride ki chat
  const chat = useRideChat(socket, acceptedRide?._id);

  // driver ki taaza location (map se aati hai)
  const positionRef = useRef(null);
  const handleLocation = useCallback((position) => {
    positionRef.current = position;
  }, []);

  const driverRideDetailRef = useRef(null);
  const driverRidePopUpRef = useRef(null);
  const driverDetailRef = useRef(null);

  // driver ke stats (trips, distance, earning); ride finish hone par dobara bhi chalega
  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/caption/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(resp.data);
    } catch (error) {
      console.log("stats fetch error:", error);
    }
  }, []);

  // page khulte hi profile aur stats lao
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const resp = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/caption/profile-caption`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCaptain(resp.data.caption);
      } catch (error) {
        console.log("profile fetch error:", error);
      }
    };

    fetchProfile();
    fetchStats();
  }, [fetchStats]);

  // captain ka data aate hi server ko batao ki yeh socket kiska hai
  useEffect(() => {
    if (captain?._id) {
      socket.emit("join", { userId: captain._id, userType: "caption" });
    }
  }, [captain]);

  // har 10 second mein apni location server ko bhejo, taaki user ke map par dikhe
  useEffect(() => {
    if (!captain?._id) return;

    const sendLocation = () => {
      if (!positionRef.current) return;
      const [lat, lng] = positionRef.current;
      socket.emit("update-location", { lat, lng });
    };

    sendLocation();
    const intervalId = setInterval(sendLocation, 10000);
    return () => clearInterval(intervalId);
  }, [captain, socket]);

  // nayi ride aane par popup kholo
  useEffect(() => {
    const handleNewRide = (ride) => {
      setNewRide(ride);
      setDriverRideDetail(false);
      setDriverRidePopUp(true);
    };

    socket.on("new-ride", handleNewRide);
    return () => socket.off("new-ride", handleNewRide);
  }, []);

  const handleIgnore = () => {
    setNewRide(null);
    setDriverRidePopUp(false);
    setDriverRideDetail(true);
  };

  const handleAccept = async () => {
    if (!newRide) return;

    try {
      const token = localStorage.getItem("token");
      const resp = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId: newRide._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAcceptedRide(resp.data.ride);
      setNewRide(null);
      setDriverRidePopUp(false);
      setOpenDriverRidePanel(true);
      toast.success("ride accepted");
    } catch (error) {
      console.log("accept ride error:", error);
      toast.error(error.response?.data?.message || "could not accept ride");
      handleIgnore();
    }
  };

  // driver ride cancel kare
  const handleCancelRide = async () => {
    if (!acceptedRide) return;
    if (!window.confirm("cancel this ride?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/cancel`,
        { rideId: acceptedRide._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.info("ride cancelled");
      chat.closeChat();
      setAcceptedRide(null);
      setOpenDriverRidePanel(false);
      setDriverRideDetail(true);
    } catch (error) {
      console.log("cancel ride error:", error);
      toast.error(error.response?.data?.message || "could not cancel ride");
    }
  };

  // user se OTP lekar ride shuru karo
  const handleStartRide = async (otp) => {
    if (!acceptedRide) return;

    try {
      setRideActionLoading(true);
      const token = localStorage.getItem("token");
      const resp = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/start`,
        { rideId: acceptedRide._id, otp },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAcceptedRide(resp.data.ride); // status ab "ongoing"
      toast.success("ride started");
    } catch (error) {
      console.log("start ride error:", error);
      toast.error(error.response?.data?.message || "could not start ride");
    } finally {
      setRideActionLoading(false);
    }
  };

  // manzil par pahunch kar ride khatam karo
  const handleFinishRide = async () => {
    if (!acceptedRide) return;

    try {
      setRideActionLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/finish`,
        { rideId: acceptedRide._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`ride completed, collect ₹${acceptedRide.fare}`);
      chat.closeChat();
      setAcceptedRide(null);
      setOpenDriverRidePanel(false);
      setDriverRideDetail(true);
      fetchStats(); // trips aur earning badh gaye
    } catch (error) {
      console.log("finish ride error:", error);
      toast.error(error.response?.data?.message || "could not finish ride");
    } finally {
      setRideActionLoading(false);
    }
  };

  // animation for driver ride details container
  useGSAP(() => {
    gsap.to(driverRideDetailRef.current, {
      transform: driverRideDetail ? "translateY(0%)" : "translateY(100%)",
      duration: 1,
      ease: "power2.inOut",
    });
  }, [driverRideDetail]);

  useGSAP(() => {
    gsap.to(driverRidePopUpRef.current, {
      transform: driverRidePopUp ? "translateY(0%)" : "translateY(100%)",
      duration: 1,
      ease: "power2.inOut",
    });
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
      {/* driver navbar */}
      <div className="fixed top-0 z-10 p-3 mx-3 flex gap-2.5 items-center justify-between w-full">
        <div className="w-1/5 flex items-center justify-center ">
          <img src={imageUrl} alt="app logo" className="h-10 w-16" />
        </div>

        {/* caption status changed */}
        <div className="w-3/5">
          <DriverStatus
            captain={captain}
            setDriverRideDetail={setDriverRideDetail}
            setDriverRidePopUp={setDriverRidePopUp}
          />
        </div>

        {/* account page ka link */}
        <div className="w-1/5 flex items-center justify-center">
          <Link to="/caption/account">
            <FaHome className="h-10 w-10 rounded-full bg-white p-2" />
          </Link>
        </div>
      </div>

      {/* live map */}
      <div className="h-1/2 w-full relative z-0">
        <LiveMap onLocation={handleLocation} />
      </div>

      {/* end container for driver detail */}
      <div ref={driverDetailRef} className="absolute z-10 bottom-0 w-full bg-white">
        {/* driver over all detail */}
        <DriverDetails ref={driverRideDetailRef} captain={captain} stats={stats} />

        {/* nayi ride ka popup */}
        <DriverRidePopUp
          ref={driverRidePopUpRef}
          ride={newRide}
          onIgnore={handleIgnore}
          onAccept={handleAccept}
        />

        {openDriverRidePanel && acceptedRide && (
          <DriverRideDetail
            ride={acceptedRide}
            onMessage={chat.openChat}
            onCancel={handleCancelRide}
            onStart={handleStartRide}
            onFinish={handleFinishRide}
            unread={chat.unread}
            loading={rideActionLoading}
          />
        )}
      </div>

      {/* user se chat */}
      {chat.isOpen && acceptedRide && (
        <RideChat
          title={`${acceptedRide.user?.fullName?.firstname ?? ""} ${acceptedRide.user?.fullName?.lastname ?? ""}`}
          me="caption"
          messages={chat.messages}
          onSend={chat.sendMessage}
          onClose={chat.closeChat}
        />
      )}
    </div>
  );
};

export default CaptionHomePageLayout;