import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
import { CaptionContext } from "../Context/CaptionContext";

const CaptionAccount = () => {
    const [captain, setCaptain] = useState(null);
    const { setCaptionData } = useContext(CaptionContext);
    const navigate = useNavigate();

    // page khulte hi captain ki profile lao
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const resp = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/caption/profile-caption`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setCaptain(resp.data.caption);
            } catch (error) {
                console.log("profile fetch error:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleSignOut = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.get(
                `${import.meta.env.VITE_BASE_URL}/caption/logout-caption`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.log("logout error:", error);
        } finally {
            // API fail bhi ho, browser se login ka data hata do
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("caption");
            setCaptionData(null);
            toast.success("signed out successfully");
            navigate("/caption-login");
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* top bar */}
            <div className="flex items-center gap-4 p-4 bg-white">
                <Link to="/caption/home-page">
                    <BiArrowBack className="h-8 w-8" />
                </Link>
                <h1 className="text-xl font-semibold capitalize">account</h1>
            </div>

            {/* profile */}
            <div className="flex items-center gap-4 p-5 bg-white mt-2">
                <img
                    src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
                    alt="driver"
                    className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-lg font-semibold capitalize">
                        {captain
                            ? `${captain.fullName.firstName} ${captain.fullName.lastName}`
                            : "Loading..."}
                    </h2>
                    <p className="text-sm text-gray-600">{captain?.email}</p>
                    <p
                        className={`text-sm font-medium capitalize ${captain?.status === "active" ? "text-green-600" : "text-gray-500"
                            }`}
                    >
                        {captain?.status === "active" ? "online" : "offline"}
                    </p>
                </div>
            </div>

            {/* vehicle details */}
            <div className="p-5 bg-white mt-2">
                <h3 className="text-base font-semibold capitalize mb-3">vehicle details</h3>
                <div className="flex justify-between py-2 border-b border-gray-200 capitalize">
                    <span className="text-gray-600">model</span>
                    <span className="font-medium">{captain?.vechile?.model}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 capitalize">
                    <span className="text-gray-600">number plate</span>
                    <span className="font-medium uppercase">{captain?.vechile?.numberPlate}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 capitalize">
                    <span className="text-gray-600">color</span>
                    <span className="font-medium">{captain?.vechile?.color}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 capitalize">
                    <span className="text-gray-600">type</span>
                    <span className="font-medium">{captain?.vechile?.vechileType}</span>
                </div>
                <div className="flex justify-between py-2 capitalize">
                    <span className="text-gray-600">capacity</span>
                    <span className="font-medium">{captain?.vechile?.capacity}</span>
                </div>
            </div>

            {/* sign out */}
            <div className="mt-auto p-5">
                <button
                    onClick={handleSignOut}
                    className="w-full py-3 bg-red-500 text-white text-lg font-semibold rounded-lg capitalize"
                >
                    sign out
                </button>
            </div>
        </div>
    );
};

export default CaptionAccount;