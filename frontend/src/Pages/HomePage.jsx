import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
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
import { useSheet } from "../hooks/useSheet";
import Logo from "../components/ui/Logo";
import Avatar from "../components/ui/Avatar";

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

  // har panel ka ref; open hone par neeche se upar aata hai (hooks/useSheet.js)
  const vechilePanelRef = useSheet(vechilePanel);
  const confirmVechilePanelRef = useSheet(confirmVechilePanel);
  const vechileFoundRef = useSheet(vechileFound);
  const waitingForDriverRef = useSheet(waitingForDriver);
  const ridingRef = useSheet(riding);
  const rideCompletedRef = useSheet(rideCompleted);

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

  const userName = user ? `${user.fullName?.firstname ?? ""} ${user.fullName?.lastname ?? ""}`.trim() : "";
  const nearbyCount = nearbyCaptains.length;

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white">
      {/* upar: logo aur account button, map ke upar tairte hue */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
        <div className="rounded-full bg-white px-3 py-1.5 shadow-md">
          <Logo className="text-lg" />
        </div>
        <Link to="/user/account" aria-label="account" className="rounded-full shadow-md">
          <Avatar name={userName} size="sm" />
        </Link>
      </div>

      {/* live map: user ki jagah aur paas ke drivers */}
      <div className="relative z-0 flex-1">
        <LiveMap markers={nearbyCaptains} onLocation={handleLocation} />
      </div>

      {/* "kahan jaana hai?" card */}
      <div className="relative z-10 -mt-6 rounded-t-3xl bg-white px-5 pt-5 pb-6 shadow-[0_-8px_30px_rgb(0_0_0/0.08)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted capitalize">{userName ? `Hi, ${user.fullName?.firstname}` : "Hi there"} 👋</p>
            <h4 className="text-2xl font-bold">Where to?</h4>
          </div>

          {/* paas ke drivers ki ginti */}
          <span className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs font-medium">
            <span className={`h-2 w-2 rounded-full ${nearbyCount > 0 ? "bg-brand" : "bg-zinc-400"}`} />
            {nearbyCount > 0 ? `${nearbyCount} driver${nearbyCount > 1 ? "s" : ""} nearby` : "No drivers nearby"}
          </span>
        </div>

        <form onSubmit={submitHandler} className="mt-4">
          {/* dono input ek dabbe mein, baayein dot-line */}
          <div className="relative rounded-2xl bg-surface">
            <div className="pointer-events-none absolute top-[22px] bottom-[22px] left-4 flex flex-col items-center">
              <span className="h-2.5 w-2.5 rounded-full bg-ink" />
              <span className="my-1 w-px flex-1 bg-zinc-400" />
              <span className="h-2.5 w-2.5 bg-ink" />
            </div>

            <input
              type="text"
              value={pickUpLocation}
              onChange={(e) => setPickUpLocation(e.target.value)}
              className="w-full bg-transparent py-3.5 pr-4 pl-10 placeholder:text-zinc-500"
              placeholder="Pickup location"
            />
            <div className="mr-4 ml-10 border-t border-line" />
            <input
              type="text"
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              className="w-full bg-transparent py-3.5 pr-4 pl-10 placeholder:text-zinc-500"
              placeholder="Where are you going?"
            />
          </div>

          <button type="submit" disabled={loadingFare} className="btn-primary mt-4">
            {loadingFare ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Finding fares...
              </>
            ) : (
              <>
                Find a ride <FaArrowRight />
              </>
            )}
          </button>
        </form>
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