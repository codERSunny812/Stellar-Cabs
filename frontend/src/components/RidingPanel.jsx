import { forwardRef } from "react";
import { FaMessage } from "react-icons/fa6";
import { getVehicle } from "../utils/vechiles";
import Sheet from "./ui/Sheet";
import Avatar from "./ui/Avatar";
import IconButton from "./ui/IconButton";

// ride chal rahi hai: manzil, driver aur kiraya
const RidingPanel = forwardRef(({ ride, onMessage, unread = 0 }, ref) => {
    const captain = ride?.captain;
    const vehicle = getVehicle(ride?.vehicleType);
    const driverName = captain
        ? `${captain.fullName?.firstName ?? ""} ${captain.fullName?.lastName ?? ""}`.trim()
        : "";
    const minutes = ride?.duration ? Math.round(ride.duration / 60) : null;

    return (
        <Sheet ref={ref}>
            <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
                </span>
                <span className="text-sm font-semibold text-brand">Trip in progress</span>
            </div>

            <h3 className="mt-2 text-2xl font-bold">
                {minutes ? `Arriving in ~${minutes} min` : "On the way"}
            </h3>

            {/* manzil */}
            <div className="mt-4 rounded-2xl bg-surface p-4">
                <p className="eyebrow">heading to</p>
                <p className="mt-0.5 font-semibold capitalize">{ride?.destination}</p>
            </div>

            {/* driver */}
            <div className="mt-5 flex items-center gap-3">
                <Avatar name={driverName} />
                <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold capitalize">{driverName}</p>
                    <p className="truncate text-sm text-muted capitalize">
                        {vehicle?.name} · <span className="uppercase">{captain?.vechile?.numberPlate}</span>
                    </p>
                </div>
                <IconButton icon={FaMessage} label="message" onClick={onMessage} badge={unread} />
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <span className="text-muted">Pay in cash at drop</span>
                <span className="text-lg font-bold">₹{ride?.fare}</span>
            </div>
        </Sheet>
    );
});

export default RidingPanel;