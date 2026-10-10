import { Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import AuthLayout from "./ui/AuthLayout";

// abhi email bhejne ka system nahi hai, isliye saaf "jald aa raha hai" page
const ForgotPassword = () => (
  <AuthLayout backTo="/login" title="Forgot password?" subtitle="Password reset by email is coming soon.">
    <div className="flex flex-col items-center rounded-2xl bg-surface px-6 py-10 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-white">
        <FiLock className="h-6 w-6" />
      </span>
      <p className="mt-4 text-sm text-muted">
        For now, create a new account or try logging in again with the correct password.
      </p>
    </div>
    <Link to="/login" className="btn-primary mt-6">
      Back to log in
    </Link>
  </AuthLayout>
);

export default ForgotPassword;