import { forwardRef } from "react";
import { FaUser } from "react-icons/fa";
import { VEHICLES } from "../utils/vechiles";
import Sheet from "./ui/Sheet";

// teeno gaadiyan aur unka kiraya; ek par tap = wahi chuni
const ShowCabs = forwardRef(({ fareData, onSelect, setVechilePanel }, ref) => {
    const km = fareData ? (fareData.distance / 1000).toFixed(1) : null;
    const minutes = fareData ? Math.round(fareData.duration / 60) : null;

    return (
        <Sheet ref={ref} onClose={() => setVechilePanel(false)}>
            <h3 className="text-2xl font-bold">Choose a ride</h3>
            {fareData && (
                <p className="mt-1 text-sm text-muted">
                    {km} km · about {minutes} min
                </p>
            )}

            <div className="mt-4 flex flex-col gap-2">
                {VEHICLES.map((vehicle) => (
                    <button
                        key={vehicle.type}
                        type="button"
                        onClick={() => onSelect(vehicle.type)}
                        className="flex items-center gap-4 rounded-2xl border-2 border-transparent bg-surface px-4 py-3.5 text-left transition hover:border-ink active:scale-[0.99]"
                    >
                        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-white">
                            <vehicle.icon className="h-8 w-8" />
                        </span>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{vehicle.name}</h4>
                                <span className="flex items-center gap-1 text-xs text-muted">
                                    <FaUser className="h-2.5 w-2.5" /> {vehicle.capacity}
                                </span>
                            </div>
                            <p className="text-sm text-muted">{vehicle.desc}</p>
                        </div>

                        {/* backend se aaya asli kiraya */}
                        <span className="text-lg font-bold">₹{fareData?.fares?.[vehicle.type] ?? "--"}</span>
                    </button>
                ))}
            </div>
        </Sheet>
    );
});

export default ShowCabs;