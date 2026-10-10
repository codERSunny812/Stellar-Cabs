import { forwardRef } from "react";
import Sheet from "../../ui/Sheet";
import Avatar from "../../ui/Avatar";
import TripRoute from "../../ui/TripRoute";
import { getVehicle } from "../../../utils/vechiles";

// nayi ride aayi: kiraya, doori, raasta aur accept/ignore
const DriverRidePopUp = forwardRef(({ ride, onIgnore, onAccept, loading = false }, ref) => {
  // user model mein firstname/lastname chhote letters mein hai
  const userName = ride
    ? `${ride.user?.fullName?.firstname ?? ""} ${ride.user?.fullName?.lastname ?? ""}`.trim()
    : "";
  const km = ride?.distance ? (ride.distance / 1000).toFixed(1) : "-";
  const minutes = ride?.duration ? Math.round(ride.duration / 60) : "-";
  const vehicle = getVehicle(ride?.vehicleType);

  return (
    <Sheet ref={ref}>
      <div className="flex items-start justify-between">
        <div>
          <span className="rounded-full bg-ink px-2.5 py-1 text-xs font-semibold text-white">
            New ride request
          </span>
          <p className="mt-3 text-4xl font-extrabold tracking-tight">₹{ride?.fare ?? "--"}</p>
          <p className="mt-1 text-sm text-muted">
            {km} km · {minutes} min · {vehicle?.name ?? "Ride"} · Cash
          </p>
        </div>
        {vehicle && (
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-surface">
            <vehicle.icon className="h-7 w-7" />
          </span>
        )}
      </div>

      {/* rider */}
      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-surface p-3">
        <Avatar name={userName} size="sm" />
        <p className="font-medium capitalize">{userName || "Rider"}</p>
      </div>

      <div className="mt-5">
        <TripRoute pickup={ride?.pickup} destination={ride?.destination} />
      </div>

      <div className="mt-6 grid grid-cols-[1fr_2fr] gap-3">
        <button onClick={onIgnore} disabled={loading} className="btn-secondary">
          Ignore
        </button>
        <button onClick={onAccept} disabled={loading} className="btn-success">
          {loading ? "Accepting..." : "Accept"}
        </button>
      </div>
    </Sheet>
  );
});

export default DriverRidePopUp;