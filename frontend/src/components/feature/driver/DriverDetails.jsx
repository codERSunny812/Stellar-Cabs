import { BsFillCarFrontFill } from "react-icons/bs";
import { FaRoute } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import Avatar from "../../ui/Avatar";
import { getVehicle } from "../../../utils/vechiles";

// driver ka card: naam, gaadi, kamai aur stats
const DriverDetails = ({ captain, stats, online }) => {
    const name = captain ? `${captain.fullName?.firstName ?? ""} ${captain.fullName?.lastName ?? ""}`.trim() : "";
    const vehicle = getVehicle(captain?.vechile?.vechileType);

    const insights = [
        { icon: BsFillCarFrontFill, label: "Trips", value: stats ? stats.totalTrips : "-" },
        { icon: FaRoute, label: "Distance", value: stats ? `${(stats.totalDistance / 1000).toFixed(1)} km` : "-" },
        { icon: FaRupeeSign, label: "Earned", value: stats ? `₹${stats.totalEarning}` : "-" },
    ];

    return (
        <div className="relative z-10 -mt-6 rounded-t-3xl bg-white px-5 pt-5 pb-6 shadow-[0_-8px_30px_rgb(0_0_0/0.08)]">
            {/* online/offline ka sandesh */}
            <div className={`mb-5 flex items-center gap-3 rounded-2xl px-4 py-3 ${online ? "bg-green-50" : "bg-surface"}`}>
                <span className="relative flex h-2.5 w-2.5">
                    {online && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />}
                    <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${online ? "bg-brand" : "bg-zinc-400"}`} />
                </span>
                <p className="text-sm font-medium">
                    {online ? "Finding rides near you…" : "You're offline. Go online to get rides."}
                </p>
            </div>

            {/* driver */}
            <div className="flex items-center gap-3">
                {captain ? <Avatar name={name} /> : <div className="h-12 w-12 animate-pulse rounded-full bg-surface" />}
                <div className="min-w-0 flex-1">
                    {captain ? (
                        <>
                            <h4 className="truncate font-semibold capitalize">{name}</h4>
                            <p className="truncate text-sm text-muted capitalize">
                                {vehicle?.name} · <span className="uppercase">{captain.vechile?.numberPlate}</span>
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="h-4 w-28 animate-pulse rounded bg-surface" />
                            <div className="mt-2 h-3 w-40 animate-pulse rounded bg-surface" />
                        </>
                    )}
                </div>
                <div className="text-right">
                    <p className="text-xl font-bold">₹{stats ? stats.totalEarning : 0}</p>
                    <p className="text-xs text-muted">total earned</p>
                </div>
            </div>

            {/* stats */}
            <div className="mt-5 grid grid-cols-3 gap-3">
                {insights.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex flex-col items-center rounded-2xl bg-surface px-2 py-3.5">
                        <Icon className="h-5 w-5 text-muted" />
                        <p className="mt-2 font-bold">{value}</p>
                        <p className="text-xs text-muted">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DriverDetails;