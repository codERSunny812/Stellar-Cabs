import { forwardRef } from "react";

// neeche se upar aane wala panel; GSAP isi ref ko upar-neeche karta hai
// onClose diya ho to handle dabane par band hota hai
const Sheet = forwardRef(({ children, onClose, className = "" }, ref) => (
    <div ref={ref} className={`sheet ${className}`}>
        <button
            type="button"
            aria-label="close"
            onClick={onClose}
            className="block w-full"
            disabled={!onClose}
        >
            <div className="sheet-handle" />
        </button>
        {children}
    </div>
));

export default Sheet;