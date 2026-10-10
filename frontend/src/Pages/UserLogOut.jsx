import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// /users/logout par aate hi logout karke login page par bhejo
const UserLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
            } catch (error) {
                console.log("logout error:", error);
            } finally {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
        };

        logout();
    }, [navigate]);

    return (
        <div className="grid h-full place-items-center">
            <span className="h-8 w-8 animate-spin rounded-full border-4 border-surface border-t-ink" />
        </div>
    );
};

export default UserLogout;