import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";
import AuthLayout from "../components/ui/AuthLayout";
import PasswordInput from "../components/ui/PasswordInput";

const UserSignUp = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignupForm = async (e) => {
        e.preventDefault();

        if (!firstname || !lastname || !email || !password) {
            toast.error("please fill all the fields");
            return;
        }

        const newUser = { fullName: { firstname, lastname }, email, password };

        try {
            setLoading(true);
            const resp = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
            setUserData(resp.data?.data);
            toast.success("account created, please log in");
            navigate("/login");
        } catch (error) {
            console.log("signup error:", error);
            // express-validator ki pehli galti dikhao
            const msg =
                error?.response?.data?.errors?.[0]?.msg ||
                error?.response?.data?.message ||
                "something went wrong";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            backTo="/login"
            title="Create account"
            subtitle="It takes less than a minute."
            footer={
                <p className="text-center text-xs text-muted">
                    By signing up you agree to our Terms of Service and Privacy Policy.
                </p>
            }
        >
            <form onSubmit={handleSignupForm} className="flex flex-col gap-5">
                <div>
                    <label className="label">Your name</label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First name"
                            className="input"
                        />
                        <input
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last name"
                            className="input"
                        />
                    </div>
                </div>

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
                    <PasswordInput
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                    />
                </div>

                <button type="submit" disabled={loading} className="btn-primary mt-2">
                    {loading ? "Creating account..." : "Sign up"}
                </button>

                <p className="text-center text-sm text-muted">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-ink underline underline-offset-4">
                        Log in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default UserSignUp;