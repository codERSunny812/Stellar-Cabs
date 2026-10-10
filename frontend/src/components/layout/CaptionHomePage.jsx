import { Link } from "react-router-dom";
import DriverStatus from "../feature/driver/DriverStatus";
import DriverDetails from "../feature/driver/DriverDetails";
import DriverRidePopUp from "../feature/driver/DriverRidePopUp";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import DriverRideDetail from "../feature/driver/DriverRideDetail";
import axios from "axios";
import { toast } from "react-toastify";
import { SocketContext } from "../../Context/SocketContext";
import LiveMap from "../common/LiveMap";
import RideChat from "../common/RideChat";
import { useRideChat } from "../../hooks/useRideChat";
import { useSheet } from "../../hooks/useSheet";
import Logo from "../ui/Logo";
import Avatar from "../ui/Avatar";

const CaptionHomePageLayout = () => {
  // state variables
  const [online, setOnline] = useState(false); // driver online hai ya nahi
  const [accepting, setAccepting] = useState(false);
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

  // neeche se aane wale panel (hooks/useSheet.js)
  const driverRidePopUpRef = useSheet(driverRidePopUp);
  const driverRideDetailRef = useSheet(openDriverRidePanel && !!acceptedRide);

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
        setOnline(resp.data.caption?.status === "active");
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
      setDriverRidePopUp(true);
    };

    socket.on("new-ride", handleNewRide);
    return () => socket.off("new-ride", handleNewRide);
  }, []);

  const handleIgnore = () => {
    setNewRide(null);
    setDriverRidePopUp(false);
  };

  // offline hone par aayi hui ride ka popup bhi band
  const handleStatusChange = (isOnline) => {
    setOnline(isOnline);
    if (!isOnline) handleIgnore();
  };

  const handleAccept = async () => {
    if (!newRide) return;

    try {
      setAccepting(true);
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
    } finally {
      setAccepting(false);
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
      fetchStats(); // trips aur earning badh gaye
    } catch (error) {
      console.log("finish ride error:", error);
      toast.error(error.response?.data?.message || "could not finish ride");
    } finally {
      setRideActionLoading(false);
    }
  };

  const name = captain ? `${captain.fullName?.firstName ?? ""} ${captain.fullName?.lastName ?? ""}`.trim() : "";

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white">
      {/* upar: logo, online switch, account */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-2 p-4">
        <div className="rounded-full bg-white px-3 py-1.5 shadow-md">
          <Logo className="text-lg" />
        </div>

        {/* ride chal rahi ho to offline nahi ho sakte */}
        <DriverStatus online={online} onChange={handleStatusChange} disabled={!captain || !!acceptedRide} />

        <Link to="/caption/account" aria-label="account" className="rounded-full shadow-md">
          <Avatar name={name} size="sm" />
        </Link>
      </div>

      {/* live map */}
      <div className="relative z-0 flex-1">
        <LiveMap onLocation={handleLocation} />
      </div>

      {/* driver ka card: naam, kamai, stats */}
      <DriverDetails captain={captain} stats={stats} online={online} />

      {/* nayi ride ka popup */}
      <DriverRidePopUp
        ref={driverRidePopUpRef}
        ride={newRide}
        onIgnore={handleIgnore}
        onAccept={handleAccept}
        loading={accepting}
      />

      {/* accept ki hui ride */}
      <DriverRideDetail
        ref={driverRideDetailRef}
        ride={acceptedRide}
        onMessage={chat.openChat}
        onCancel={handleCancelRide}
        onStart={handleStartRide}
        onFinish={handleFinishRide}
        unread={chat.unread}
        loading={rideActionLoading}
      />

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