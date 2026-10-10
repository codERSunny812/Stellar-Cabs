import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";
import AuthLayout from "../components/ui/AuthLayout";
import PasswordInput from "../components/ui/PasswordInput";

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLoginForm = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("please enter email and password");
            return;
        }

        try {
            setLoading(true);
            const resp = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, { email, password });

            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("user", JSON.stringify(resp.data));
            setUserData(resp.data);
            toast.success("welcome back!");
            navigate("/home-page");
        } catch (error) {
            console.log("login error:", error);
            toast.error(error?.response?.data?.message || "login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Log in to book your next ride."
            footer={
                <Link to="/caption-login" className="btn-secondary">
                    Log in as a driver
                </Link>
            }
        >
            <form onSubmit={handleLoginForm} className="flex flex-col gap-5">
                <div>
                    <label htmlFor="email" className="label">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="input"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="label">Password</label>
                    <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Link to="/user/forgot-password" className="mt-2 inline-block text-sm font-medium text-muted">
                        Forgot password?
                    </Link>
                </div>

                <button type="submit" disabled={loading} className="btn-primary mt-2">
                    {loading ? "Logging in..." : "Log in"}
                </button>

                <p className="text-center text-sm text-muted">
                    New here?{" "}
                    <Link to="/signup" className="font-semibold text-ink underline underline-offset-4">
                        Create an account
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default UserLogin;