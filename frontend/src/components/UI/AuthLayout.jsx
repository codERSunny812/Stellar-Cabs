import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Logo from "./Logo";

// login/signup pages ka common dhaancha: back button, logo, heading, form, footer
const AuthLayout = ({ backTo = "/", title, subtitle, children, footer }) => (
    <div className="flex min-h-full flex-col overflow-y-auto px-6 pt-5 pb-6">
        <div className="flex items-center justify-between">
            <Link to={backTo} aria-label="back" className="-ml-2 grid h-10 w-10 place-items-center rounded-full hover:bg-surface">
                <BiArrowBack className="h-6 w-6" />
            </Link>
            <Logo />
            <span className="w-10" />
        </div>

        <div className="mt-10 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
        </div>

        <div className="flex-1">{children}</div>

        {footer && <div className="mt-8">{footer}</div>}
    </div>
);

export default AuthLayout;