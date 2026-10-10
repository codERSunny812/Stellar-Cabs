import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

// password input jisme aankh dabakar password dikh jaaye
const PasswordInput = ({ value, onChange, placeholder = "Enter your password", id }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <input
                id={id}
                type={show ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="input pr-12"
            />
            <button
                type="button"
                aria-label={show ? "hide password" : "show password"}
                onClick={() => setShow(!show)}
                className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-muted"
            >
                {show ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
            </button>
        </div>
    );
};

export default PasswordInput;