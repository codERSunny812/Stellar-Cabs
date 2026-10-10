import { useState } from "react";
import { IoCall } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";

const DriverRideDetail = ({ ride, onMessage, onCancel, onStart, onFinish, unread = 0, loading = false }) => {
    const [otp, setOtp] = useState("");

    const userName = `${ride.user?.fullName?.firstname ?? ""} ${ride.user?.fullName?.lastname ?? ""}`;
    const isOngoing = ride.status === "ongoing";

    return (
        <div className="flex flex-col bg-gray-300">
            {/* top part: ride ka status */}
            <div className="flex items-center justify-between px-4 py-2">
                <h3 className="font-semibold">#{ride._id.slice(-6)}</h3>
                <span
                    className={`text-sm font-semibold capitalize px-3 py-1 rounded-full ${isOngoing ? "bg-green-600 text-white" : "bg-amber-400 text-white"
                        }`}
                >
                    {isOngoing ? "ride in progress" : "go to pickup"}
                </span>
            </div>

            <div className="border-2 border-gray-600"></div>

            {/* customer info */}
            <div className="riderInfo flex items-center justify-between py-1 px-2 rounded-lg mt-2">
                <div className="riderData flex items-center px-3 gap-5">
                    <img
                        src="https://xsgames.co/randomusers/assets/avatars/male/74.jpg"
                        alt="rider image"
                        className="h-12 w-12 rounded-lg"
                    />
                    <h3 className="text-xl font-medium capitalize">{userName}</h3>
                </div>

                <div className="fareAmount text-lg font-semibold px-3">₹{ride.fare}</div>
            </div>

            {/* ride information */}
            <div className="mt-1 bg-white">
                <div className="pickup py-1 px-3">
                    <h2 className="text-lg uppercase text-gray-500 font-semibold">pickup</h2>
                    <h4 className="text-base capitalize">{ride.pickup}</h4>
                </div>

                <div className="drop py-1 px-3">
                    <h2 className="text-lg uppercase text-gray-500 font-semibold">drop</h2>
                    <h4 className="text-base capitalize">{ride.destination}</h4>
                </div>

                <div className="tripFare py-1 px-3">
                    <h3 className="text-xl text-gray-500 uppercase font-semibold">trip</h3>
                    <div className="flex items-center justify-between capitalize">
                        <h3>distance</h3>
                        <h4>{(ride.distance / 1000).toFixed(1)} km</h4>
                    </div>
                    <div className="flex items-center justify-between capitalize">
                        <h3>time</h3>
                        <h4>{Math.round(ride.duration / 60)} min</h4>
                    </div>
                    <div className="flex items-center justify-between capitalize font-semibold">
                        <h3>fare</h3>
                        <h4>₹{ride.fare}</h4>
                    </div>
                </div>

                {/* action buttons */}
                <div className="flex items-center justify-around mt-4 mb-2">
                    {/* call: phone number aane ke baad chalega */}
                    <div className="flex items-center flex-col opacity-40" title="phone number not added yet">
                        <IoCall className="h-12 w-12 bg-gray-300 p-3 rounded-full" />
                        <p className="text-base">call</p>
                    </div>

                    {/* message: chat kholo */}
                    <button onClick={onMessage} className="flex items-center flex-col relative">
                        <FaMessage className="h-12 w-12 bg-gray-300 p-3 rounded-full" />
                        {unread > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 min-w-5 px-1 flex items-center justify-center">
                                {unread}
                            </span>
                        )}
                        <p className="text-base">message</p>
                    </button>

                    {/* cancel: sirf ride shuru hone se pehle */}
                    {!isOngoing && (
                        <button onClick={onCancel} className="flex items-center flex-col">
                            <FcCancel className="h-12 w-12 bg-gray-300 p-3 rounded-full" />
                            <p className="text-base">cancel</p>
                        </button>
                    )}
                </div>
            </div>

            {/* pickup par: user se OTP lekar ride shuru karo */}
            {!isOngoing && (
                <div className="w-full p-3 bg-white">
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        placeholder="enter 4 digit OTP from user"
                        className="bg-[#eee] w-full px-4 py-3 rounded-lg text-lg tracking-widest mb-2"
                    />
                    <button
                        onClick={() => onStart(otp)}
                        disabled={otp.length !== 4 || loading}
                        className="py-4 px-5 bg-amber-400 w-full text-lg text-white font-semibold capitalize rounded-lg disabled:opacity-50"
                    >
                        {loading ? "starting..." : "start ride"}
                    </button>
                </div>
            )}

            {/* ride chal rahi hai: manzil par finish */}
            {isOngoing && (
                <div className="w-full">
                    <button
                        onClick={onFinish}
                        disabled={loading}
                        className="py-4 px-5 bg-green-600 w-full text-lg text-white font-semibold capitalize disabled:opacity-50"
                    >
                        {loading ? "finishing..." : "finish ride"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default DriverRideDetail;