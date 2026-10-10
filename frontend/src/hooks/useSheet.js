import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// ek panel ko khulne/band hone ka animation; ref panel par lagao
// yPercent panel ki apni height ke hisaab se chalta hai, isliye content badhne par bhi poora chhupa rehta hai
export const useSheet = (open) => {
    const ref = useRef(null);
    const firstRun = useRef(true);

    useGSAP(() => {
        const el = ref.current;
        if (!el) return;

        // pehli baar: bina animation ke seedha sahi jagah rakho
        if (firstRun.current) {
            firstRun.current = false;
            gsap.set(el, { yPercent: open ? 0 : 100, visibility: open ? "visible" : "hidden" });
            return;
        }

        gsap.killTweensOf(el); // pichhla adhoora animation rok do

        if (open) {
            gsap.set(el, { visibility: "visible" });
            gsap.to(el, { yPercent: 0, duration: 0.55, ease: "power3.out" });
        } else {
            gsap.to(el, {
                yPercent: 100,
                duration: 0.35,
                ease: "power2.in",
                // band hone ke baad chhupa do, taaki shadow bhi na dikhe
                onComplete: () => gsap.set(el, { visibility: "hidden" }),
            });
        }
    }, [open]);

    return ref;
};