import { forwardRef } from "react";
import { FaCheck } from "react-icons/fa6";
import Sheet from "./ui/Sheet";
import TripRoute from "./ui/TripRoute";

// ride khatam: kiraya aur trip ka summary
const RideCompleted = forwardRef(({ ride, onDone }, ref) => {
    const km = ride?.distance ? (ride.distance / 1000).toFixed(1) : "-";
    const minutes = ride?.duration ? Math.round(ride.duration / 60) : "-";

    return (
        <Sheet ref={ref}>
            <div className="flex flex-col items-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-white">
                    <FaCheck className="h-7 w-7" />
                </span>
                <h3 className="mt-4 text-2xl font-bold">You've arrived!</h3>
                <p className="mt-1 text-sm text-muted">Please pay your driver in cash</p>
                <p className="mt-4 text-5xl font-extrabold tracking-tight">₹{ride?.fare}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-surface p-3 text-center">
                    <p className="eyebrow">distance</p>
                    <p className="mt-0.5 text-lg font-bold">{km} km</p>
                </div>
                <div className="rounded-2xl bg-surface p-3 text-center">
                    <p className="eyebrow">time</p>
                    <p className="mt-0.5 text-lg font-bold">{minutes} min</p>
                </div>
            </div>

            <div className="mt-5">
                <TripRoute pickup={ride?.pickup} destination={ride?.destination} />
            </div>

            <button onClick={onDone} className="btn-primary mt-6">
                Done
            </button>
        </Sheet>
    );
});

export default RideCompleted;