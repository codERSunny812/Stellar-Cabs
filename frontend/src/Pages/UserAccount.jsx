import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FiLogOut, FiMail, FiUser } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";
import Avatar from "../components/ui/Avatar";

const UserAccount = () => {
    const [user, setUser] = useState(null);
    const [signingOut, setSigningOut] = useState(false);
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    // page khulte hi profile lao
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setUser(resp.data.data);
            } catch (error) {
                console.log("profile error:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleSignOut = async () => {
        try {
            setSigningOut(true);
            await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
        } catch (error) {
            console.log("logout error:", error);
        } finally {
            // API fail bhi ho, browser se login ka data hata do
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUserData(null);
            toast.success("signed out");
            navigate("/login");
        }
    };

    const name = user ? `${user.fullName?.firstname ?? ""} ${user.fullName?.lastname ?? ""}`.trim() : "";

    return (
        <div className="flex h-full flex-col bg-zinc-50">
            {/* top bar */}
            <div className="flex items-center gap-2 bg-white px-3 py-3">
                <Link to="/home-page" aria-label="back" className="grid h-10 w-10 place-items-center rounded-full hover:bg-surface">
                    <BiArrowBack className="h-6 w-6" />
                </Link>
                <h1 className="text-lg font-semibold">Account</h1>
            </div>

            {/* profile */}
            <div className="flex flex-col items-center bg-white px-5 pt-4 pb-7">
                {user ? (
                    <Avatar name={name} size="lg" />
                ) : (
                    <div className="h-16 w-16 animate-pulse rounded-full bg-surface" />
                )}
                {user ? (
                    <>
                        <h2 className="mt-3 text-xl font-bold capitalize">{name}</h2>
                        <p className="text-sm text-muted">{user.email}</p>
                    </>
                ) : (
                    <>
                        <div className="mt-3 h-5 w-32 animate-pulse rounded bg-surface" />
                        <div className="mt-2 h-4 w-44 animate-pulse rounded bg-surface" />
                    </>
                )}
            </div>

            {/* details */}
            <div className="mx-4 mt-4 overflow-hidden rounded-2xl bg-white">
                <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
                    <FiUser className="h-5 w-5 text-muted" />
                    <div>
                        <p className="text-xs text-muted">Name</p>
                        <p className="font-medium capitalize">{name || "--"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3.5">
                    <FiMail className="h-5 w-5 text-muted" />
                    <div>
                        <p className="text-xs text-muted">Email</p>
                        <p className="font-medium">{user?.email || "--"}</p>
                    </div>
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

export default UserAccount;