import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserAccount = () => {
    const [user, setUser] = useState(null);
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    // page khulte hi user ki profile lao
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const resp = await axios.get(`${BASE_URL}/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(resp.data.data);
            } catch (error) {
                console.log("profile fetch error:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleSignOut = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.get(`${BASE_URL}/users/logout`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.log("logout error:", error);
        } finally {
            // API fail bhi ho, browser se login ka data hata do
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUserData(null);
            toast.success("signed out successfully");
            navigate("/login");
        }
    };

    const fullName = user
        ? `${user.fullName?.firstname ?? ""} ${user.fullName?.lastname ?? ""}`
        : "Loading...";

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* top bar */}
            <div className="flex items-center gap-4 p-4 bg-white">
                <Link to="/home-page">
                    <BiArrowBack className="h-8 w-8" />
                </Link>
                <h1 className="text-xl font-semibold capitalize">account</h1>
            </div>

            {/* profile */}
            <div className="flex items-center gap-4 p-5 bg-white mt-2">
                <FaUserCircle className="h-16 w-16 text-gray-400" />
                <div>
                    <h2 className="text-lg font-semibold capitalize">{fullName}</h2>
                    <p className="text-sm text-gray-600">{user?.email}</p>
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

export default UserAccount;