import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { forwardRef, useEffect, useRef, useState } from "react";
import { PiCarProfileFill } from "react-icons/pi";
import axios from "axios";
import { toast } from "react-toastify";

const DriverStatus = forwardRef((props, ref) => {
    const [driverStatus, setDriverStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const carIconRef = useRef(null);

    // page khulne par database wala status dikhao
    useEffect(() => {
        if (props.captain) {
            setDriverStatus(props.captain.status === "active");
        }
    }, [props.captain]);

    useGSAP(() => {
        if (driverStatus) {
            gsap.to(carIconRef.current, {
                x: 100,
                duration: 1,
                ease: "power4.Out",
            });
        } else {
            gsap.to(carIconRef.current, {
                x: 0,
                duration: 1,
                ease: "power4.Out",
            });
        }
    }, [driverStatus]);

    const carIconClick = async () => {
        if (loading) return; // jab tak pehli request chal rahi hai, dobara click ignore karo

        const nextStatus = driverStatus ? "inactive" : "active";

        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/caption/status`,
                { status: nextStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // database mein save hone ke baad hi screen badlo
            if (nextStatus === "active") {
                setDriverStatus(true);
                // props.setDriverRideDetail(false);
                // props.setDriverRidePopUp(true);
            } else {
                setDriverStatus(false);
                props.setDriverRidePopUp(false);
                props.setDriverRideDetail(true);
            }
        } catch (error) {
            console.log("status update error:", error);
            toast.error("status update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            ref={ref}
            className={`rounded-full flex items-center gap-1.5 ${driverStatus ? "bg-green-500" : "bg-gray-100"
                } border-none outline-none py-1`}
        >
            {driverStatus && (
                <p className="capitalize px-2 font-medium text-white text-base">online</p>
            )}
            <PiCarProfileFill
                ref={carIconRef}
                className="bg-black rounded-full p-1.5 h-9 w-9 text-white"
                onClick={carIconClick}
            />
            {!driverStatus && (
                <p className="capitalize px-2 font-medium text-black text-base">offline</p>
            )}
        </div>
    );
});

export default DriverStatus;