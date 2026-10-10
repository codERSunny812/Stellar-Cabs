import { forwardRef } from "react";
import { getVehicle } from "../utils/vechiles";
import Sheet from "./ui/Sheet";
import TripRoute from "./ui/TripRoute";

// ride ban gayi, driver ka intezaar
const LookingForDriver = forwardRef(({ ride }, ref) => {
  const vehicle = getVehicle(ride?.vehicleType);

  return (
    <Sheet ref={ref}>
      <h3 className="text-2xl font-bold">Finding your driver</h3>
      <p className="mt-1 text-sm text-muted">Sending your request to drivers nearby…</p>

      {/* chalti hui patti */}
      <div className="my-5 h-1 w-full overflow-hidden rounded-full bg-surface">
        <div className="animate-scan h-full w-2/5 rounded-full bg-ink" />
      </div>

      {vehicle && (
        <div className="mb-5 flex items-center justify-center">
          <span className="relative grid h-24 w-24 place-items-center rounded-full bg-surface">
            <span className="absolute inset-0 animate-ping rounded-full bg-zinc-200" />
            <vehicle.icon className="relative h-11 w-11" />
          </span>
        </div>
      )}

      <TripRoute pickup={ride?.pickup} destination={ride?.destination} />

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="text-muted">{vehicle?.name} · Cash</span>
        <span className="text-lg font-bold">₹{ride?.fare}</span>
      </div>
    </Sheet>
  );
});

export default LookingForDriver;