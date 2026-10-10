// app ka naam-logo; dark = safed text (kaale background ke liye)
const Logo = ({ dark = false, className = "" }) => (
    <span
        className={`inline-flex items-center gap-1.5 text-xl font-extrabold tracking-tight ${dark ? "text-white" : "text-ink"
            } ${className}`}
    >
        <span
            className={`grid h-7 w-7 place-items-center rounded-lg text-sm ${dark ? "bg-white text-ink" : "bg-ink text-white"
                }`}
        >
            ★
        </span>
        Stellar
    </span>
);

export default Logo;