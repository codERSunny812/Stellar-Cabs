import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CaptionContext } from "../Context/CaptionContext";
import AuthLayout from "../components/ui/AuthLayout";
import PasswordInput from "../components/ui/PasswordInput";

const CaptionLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setCaptionData } = useContext(CaptionContext);
    const navigate = useNavigate();

    const handleLoginForm = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("please enter email and password");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/caption/login`, { email, password });

            if (res.data.status === "success") {
                localStorage.setItem("caption", JSON.stringify(res.data.caption));
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
                setCaptionData(res.data.caption);
                toast.success("welcome back, captain!");
                navigate("/caption/home-page");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log("captain login error:", error);
            toast.error(error?.response?.data?.message || "login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Drive with Stellar"
            subtitle="Log in to start earning on your schedule."
            footer={
                <Link to="/login" className="btn-secondary">
                    Log in as a rider
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
                </div>

                <button type="submit" disabled={loading} className="btn-primary mt-2">
                    {loading ? "Logging in..." : "Log in as driver"}
                </button>

                <p className="text-center text-sm text-muted">
                    Want to drive?{" "}
                    <Link to="/caption-signup" className="font-semibold text-ink underline underline-offset-4">
                        Sign up as a driver
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default CaptionLogin;