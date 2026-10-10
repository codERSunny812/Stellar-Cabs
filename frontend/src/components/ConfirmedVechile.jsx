import { forwardRef } from "react";
import { BsCashStack } from "react-icons/bs";
import { getVehicle } from "../utils/vechiles";
import Sheet from "./ui/Sheet";
import TripRoute from "./ui/TripRoute";

// chuni hui gaadi, raasta aur kiraya: "confirm" dabao to ride banti hai
const ConfirmedVechile = forwardRef(
  ({ fareData, vehicleType, onConfirm, onClose, loading }, ref) => {
    const vehicle = getVehicle(vehicleType);
    const fare = fareData?.fares?.[vehicleType];

    return (
      <Sheet ref={ref} onClose={onClose}>
        <h3 className="text-2xl font-bold">Confirm your ride</h3>

        {vehicle && (
          <div className="my-5 flex items-center gap-4 rounded-2xl bg-surface p-4">
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-white">
              <vehicle.icon className="h-8 w-8" />
            </span>
            <div className="flex-1">
              <p className="font-semibold">{vehicle.name}</p>
              <p className="text-sm text-muted">{vehicle.capacity} seats</p>
            </div>
            <span className="text-xl font-bold">₹{fare ?? "--"}</span>
          </div>
        )}

        <TripRoute pickup={fareData?.pickup} destination={fareData?.destination} />

        <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
          <BsCashStack className="h-5 w-5 text-brand" />
          <span className="flex-1 font-medium">Cash</span>
          <span className="font-semibold">₹{fare ?? "--"}</span>
        </div>

        <button onClick={onConfirm} disabled={loading} className="btn-primary mt-6">
          {loading ? "Booking..." : `Confirm ${vehicle?.name ?? "ride"}`}
        </button>
      </Sheet>
    );
  }
);

export default ConfirmedVechile;