import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);  // Runs only when token changes

    if (!token) {
        return null;  // Prevents rendering children
    }

    return <>{children}</>;
};
