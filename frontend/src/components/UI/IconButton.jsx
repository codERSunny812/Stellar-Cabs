// gol icon wala button (call, message, cancel); badge = unread count
const IconButton = ({ icon: Icon, label, onClick, badge = 0, disabled = false, tone = "default" }) => {
    const tones = {
        default: "bg-surface text-ink",
        danger: "bg-red-50 text-danger",
    };

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="flex flex-col items-center gap-1.5 disabled:opacity-40"
        >
            <span className={`relative grid h-12 w-12 place-items-center rounded-full ${tones[tone]}`}>
                <Icon className="h-5 w-5" />
                {badge > 0 && (
                    <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-danger px-1 text-[11px] font-bold text-white">
                        {badge}
                    </span>
                )}
            </span>
            <span className="text-xs font-medium capitalize">{label}</span>
        </button>
    );
};

export default IconButton;