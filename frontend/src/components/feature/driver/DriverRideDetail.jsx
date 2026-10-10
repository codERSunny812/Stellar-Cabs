import { forwardRef, useEffect, useState } from "react";
import { IoCall } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import Sheet from "../../ui/Sheet";
import Avatar from "../../ui/Avatar";
import TripRoute from "../../ui/TripRoute";
import IconButton from "../../ui/IconButton";

// accept ki hui ride: rider, raasta, OTP se start, aur finish
const DriverRideDetail = forwardRef(
    ({ ride, onMessage, onCancel, onStart, onFinish, unread = 0, loading = false }, ref) => {
        const [otp, setOtp] = useState("");

        // nayi ride par purana OTP saaf
        useEffect(() => {
            setOtp("");
        }, [ride?._id]);

        const userName = `${ride?.user?.fullName?.firstname ?? ""} ${ride?.user?.fullName?.lastname ?? ""}`.trim();
        const isOngoing = ride?.status === "ongoing";
        const km = ride?.distance ? (ride.distance / 1000).toFixed(1) : "-";
        const minutes = ride?.duration ? Math.round(ride.duration / 60) : "-";

        const handleStart = (e) => {
            e.preventDefault();
            if (otp.length !== 4) return;
            onStart(otp);
        };

        return (
            <Sheet ref={ref}>
                {/* status */}
                <div className="flex items-center justify-between">
                    <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${isOngoing ? "bg-green-50 text-brand" : "bg-amber-50 text-amber-700"
                            }`}
                    >
                        {isOngoing ? "Trip in progress" : "Heading to pickup"}
                    </span>
                    <span className="text-xs text-muted">#{ride?._id?.slice(-6)}</span>
                </div>

                {/* rider */}
                <div className="mt-4 flex items-center gap-3">
                    <Avatar name={userName} />
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-lg font-semibold capitalize">{userName}</p>
                        <p className="text-sm text-muted">Cash payment</p>
                    </div>
                    <p className="text-2xl font-bold">₹{ride?.fare}</p>
                </div>

                {/* call / message / cancel */}
                <div className="mt-5 flex justify-around">
                    <IconButton icon={IoCall} label="call" disabled />
                    <IconButton icon={FaMessage} label="message" onClick={onMessage} badge={unread} />
                    {/* ride shuru hone ke baad cancel nahi */}
                    <IconButton icon={MdClose} label="cancel" tone="danger" onClick={onCancel} disabled={isOngoing || loading} />
                </div>

                <div className="mt-5 border-t border-line pt-5">
                    <TripRoute pickup={ride?.pickup} destination={ride?.destination} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-surface p-3 text-center">
                        <p className="eyebrow">distance</p>
                        <p className="mt-0.5 font-bold">{km} km</p>
                    </div>
                    <div className="rounded-2xl bg-surface p-3 text-center">
                        <p className="eyebrow">time</p>
                        <p className="mt-0.5 font-bold">{minutes} min</p>
                    </div>
                </div>

                {isOngoing ? (
                    <button onClick={onFinish} disabled={loading} className="btn-primary mt-6">
                        {loading ? "Finishing..." : `Complete ride · collect ₹${ride?.fare}`}
                    </button>
                ) : (
                    // rider se 4 digit PIN lo
                    <form onSubmit={handleStart} className="mt-6">
                        <label htmlFor="otp" className="label">Ask the rider for their PIN</label>
                        <div className="flex gap-3">
                            <input
                                id="otp"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={4}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                placeholder="• • • •"
                                className="input w-36 shrink-0 text-center text-xl font-bold tracking-[0.5em]"
                            />
                            <button type="submit" disabled={loading || otp.length !== 4} className="btn-success">
                                {loading ? "Starting..." : "Start ride"}
                            </button>
                        </div>
                    </form>
                )}
            </Sheet>
        );
    }
);

export default DriverRideDetail;