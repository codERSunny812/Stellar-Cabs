import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { CaptionContext } from "../Context/CaptionContext";
import Avatar from "../components/ui/Avatar";
import { getVehicle } from "../utils/vechiles";

const CaptionAccount = () => {
    const [captain, setCaptain] = useState(null);
    const [signingOut, setSigningOut] = useState(false);
    const { setCaptionData } = useContext(CaptionContext);
    const navigate = useNavigate();

    // page khulte hi captain ki profile lao
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/caption/profile-caption`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setCaptain(resp.data.caption);
            } catch (error) {
                console.log("profile fetch error:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleSignOut = async () => {
        try {
            setSigningOut(true);
            await axios.get(`${import.meta.env.VITE_BASE_URL}/caption/logout-caption`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
        } catch (error) {
            console.log("logout error:", error);
        } finally {
            // API fail bhi ho, browser se login ka data hata do
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("caption");
            setCaptionData(null);
            toast.success("signed out");
            navigate("/caption-login");
        }
    };

    const name = captain ? `${captain.fullName?.firstName ?? ""} ${captain.fullName?.lastName ?? ""}`.trim() : "";
    const online = captain?.status === "active";
    const vehicle = getVehicle(captain?.vechile?.vechileType);

    const vehicleRows = [
        ["Type", vehicle?.name ?? captain?.vechile?.vechileType],
        ["Model", captain?.vechile?.model],
        ["Colour", captain?.vechile?.color],
        ["Seats", captain?.vechile?.capacity],
    ];

    return (
        <div className="flex h-full flex-col overflow-y-auto bg-zinc-50">
            {/* top bar */}
            <div className="flex items-center gap-2 bg-white px-3 py-3">
                <Link to="/caption/home-page" aria-label="back" className="grid h-10 w-10 place-items-center rounded-full hover:bg-surface">
                    <BiArrowBack className="h-6 w-6" />
                </Link>
                <h1 className="text-lg font-semibold">Account</h1>
            </div>

            {/* profile */}
            <div className="flex flex-col items-center bg-white px-5 pt-4 pb-7">
                {captain ? <Avatar name={name} size="lg" /> : <div className="h-16 w-16 animate-pulse rounded-full bg-surface" />}
                {captain ? (
                    <>
                        <h2 className="mt-3 text-xl font-bold capitalize">{name}</h2>
                        <p className="text-sm text-muted">{captain.email}</p>
                        <span
                            className={`mt-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${online ? "bg-green-50 text-brand" : "bg-surface text-muted"
                                }`}
                        >
                            <span className={`h-2 w-2 rounded-full ${online ? "bg-brand" : "bg-zinc-400"}`} />
                            {online ? "Online" : "Offline"}
                        </span>
                    </>
                ) : (
                    <>
                        <div className="mt-3 h-5 w-32 animate-pulse rounded bg-surface" />
                        <div className="mt-2 h-4 w-44 animate-pulse rounded bg-surface" />
                    </>
                )}
            </div>

            {/* gaadi */}
            <div className="mx-4 mt-4 rounded-2xl bg-white p-4">
                <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-surface">
                        {vehicle ? <vehicle.icon className="h-7 w-7" /> : null}
                    </span>
                    <div className="flex-1">
                        <p className="eyebrow">your vehicle</p>
                        <p className="font-semibold capitalize">{captain?.vechile?.model ?? "--"}</p>
                    </div>
                    <span className="rounded-lg border-2 border-ink px-2.5 py-1 text-sm font-bold tracking-wide uppercase">
                        {captain?.vechile?.numberPlate ?? "--"}
                    </span>
                </div>

                <div className="mt-4">
                    {vehicleRows.map(([label, value], i) => (
                        <div
                            key={label}
                            className={`flex justify-between py-3 text-sm ${i < vehicleRows.length - 1 ? "border-b border-line" : ""}`}
                        >
                            <span className="text-muted">{label}</span>
                            <span className="font-medium capitalize">{value ?? "--"}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* sign out */}
            <div className="mt-auto p-5">
                <button onClick={handleSignOut} disabled={signingOut} className="btn-danger">
                    <FiLogOut /> {signingOut ? "Signing out..." : "Sign out"}
                </button>
            </div>
        </div>
    );
};

export default CaptionAccount;