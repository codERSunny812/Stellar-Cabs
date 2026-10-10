import { forwardRef } from "react";
import { FaMessage } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { getVehicle } from "../utils/vechiles";
import Sheet from "./ui/Sheet";
import TripRoute from "./ui/TripRoute";
import Avatar from "./ui/Avatar";
import IconButton from "./ui/IconButton";

// driver mil gaya: uski detail aur OTP dikhao
const WaitingForDriver = forwardRef(({ ride, onMessage, unread = 0 }, ref) => {
  const captain = ride?.captain;
  const vehicle = getVehicle(ride?.vehicleType);
  const driverName = captain
    ? `${captain.fullName?.firstName ?? ""} ${captain.fullName?.lastName ?? ""}`.trim()
    : "";
  const otpDigits = String(ride?.otp ?? "").split("");

  return (
    <Sheet ref={ref}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Driver is on the way</h3>
          <p className="mt-1 text-sm text-muted">Meet at the pickup point</p>
        </div>
        {vehicle && (
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-surface">
            <vehicle.icon className="h-7 w-7" />
          </span>
        )}
      </div>

      {/* OTP: user driver ko batayega */}
      <div className="mt-5 flex items-center justify-between rounded-2xl bg-ink px-4 py-3.5 text-white">
        <span className="text-sm text-zinc-300">Share PIN with driver</span>
        <div className="flex gap-1.5">
          {otpDigits.map((digit, i) => (
            <span key={i} className="grid h-9 w-8 place-items-center rounded-lg bg-white/15 text-lg font-bold">
              {digit}
            </span>
          ))}
        </div>
      </div>

      {/* driver aur gaadi */}
      <div className="mt-5 flex items-center gap-3">
        <Avatar name={driverName} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold capitalize">{driverName}</p>
          <p className="truncate text-sm text-muted capitalize">
            {captain?.vechile?.color} {captain?.vechile?.model}
          </p>
        </div>
        <span className="rounded-lg border-2 border-ink px-2.5 py-1 text-sm font-bold tracking-wide uppercase">
          {captain?.vechile?.numberPlate}
        </span>
      </div>

      <div className="mt-5 flex justify-center gap-10">
        <IconButton icon={IoCall} label="call" disabled />
        <IconButton icon={FaMessage} label="message" onClick={onMessage} badge={unread} />
      </div>

      <div className="mt-5 border-t border-line pt-5">
        <TripRoute pickup={ride?.pickup} destination={ride?.destination} />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="text-muted">Cash</span>
        <span className="text-lg font-bold">₹{ride?.fare}</span>
      </div>
    </Sheet>
  );
});

export default WaitingForDriver;