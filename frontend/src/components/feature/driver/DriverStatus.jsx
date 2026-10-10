import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// online/offline ka switch; database mein save hone ke baad hi screen badalti hai
const DriverStatus = ({ online, onChange, disabled = false }) => {
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        if (loading || disabled) return; // pehli request chal rahi ho to dobara click ignore

        const nextStatus = online ? "inactive" : "active";

        try {
            setLoading(true);
            await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/caption/status`,
                { status: nextStatus },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            onChange(nextStatus === "active");
            toast.success(nextStatus === "active" ? "you're online" : "you're offline");
        } catch (error) {
            console.log("status update error:", error);
            toast.error("status update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            disabled={loading || disabled}
            aria-pressed={online}
            className={`flex items-center gap-2.5 rounded-full py-1.5 pr-1.5 pl-4 shadow-md transition disabled:opacity-70 ${online ? "bg-brand text-white" : "bg-white text-ink"
                }`}
        >
            <span className="text-sm font-semibold">{online ? "Online" : "Offline"}</span>

            {/* switch */}
            <span className={`relative h-7 w-12 rounded-full transition ${online ? "bg-white/30" : "bg-zinc-200"}`}>
                <span
                    className={`absolute top-1 left-1 h-5 w-5 rounded-full shadow transition-transform duration-300 ${online ? "translate-x-5 bg-white" : "translate-x-0 bg-ink"
                        }`}
                />
            </span>
        </button>
    );
};

export default DriverStatus;