// photo nahi hai to naam ke pehle akshar dikhao (jaise "RS")
const Avatar = ({ name = "", size = "md", className = "" }) => {
    const initials =
        name
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0].toUpperCase())
            .join("") || "?";

    const sizes = {
        sm: "h-9 w-9 text-sm",
        md: "h-12 w-12 text-base",
        lg: "h-16 w-16 text-xl",
    };

    return (
        <div
            className={`grid shrink-0 place-items-center rounded-full bg-ink font-semibold text-white ${sizes[size]} ${className}`}
        >
            {initials}
        </div>
    );
};

export default Avatar;