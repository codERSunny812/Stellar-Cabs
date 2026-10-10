import { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";
import Avatar from "../ui/Avatar";

// user aur driver dono ke liye ek hi chat screen
// me = "user" ya "caption", taaki apne message right side dikhein
const RideChat = ({ title, me, messages, onSend, onClose }) => {
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);
    const listRef = useRef(null);

    // naya message aate hi sirf message list ko neeche scroll karo
    // (scrollIntoView poora page bhi khiska deta hai, isliye nahi use kiya)
    useEffect(() => {
        const list = listRef.current;
        if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        const value = text.trim();
        if (!value || sending) return;

        setSending(true);
        const res = await onSend(value);
        setSending(false);

        if (res?.ok) {
            setText("");
        } else {
            toast.error(res?.error || "message not sent");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
            {/* top bar */}
            <div className="flex items-center gap-3 border-b border-line px-3 py-3">
                <button onClick={onClose} aria-label="back" className="grid h-10 w-10 place-items-center rounded-full hover:bg-surface">
                    <IoIosArrowRoundBack className="h-8 w-8" />
                </button>
                <Avatar name={title} size="sm" />
                <div>
                    <h2 className="font-semibold capitalize leading-tight">{title}</h2>
                    <p className="text-xs text-muted">{me === "user" ? "Your driver" : "Your rider"}</p>
                </div>
            </div>

            {/* messages */}
            <div ref={listRef} className="flex flex-1 flex-col gap-2 overflow-y-auto bg-zinc-50 p-4">
                {messages.length === 0 && (
                    <p className="mt-10 text-center text-sm text-muted">Say hi 👋 Messages are only kept for this ride.</p>
                )}

                {messages.map((msg, index) => {
                    const mine = msg.from === me;
                    return (
                        <div
                            key={index}
                            className={`max-w-[75%] px-3.5 py-2 ${mine ? "self-end rounded-2xl rounded-br-md bg-ink text-white" : "self-start rounded-2xl rounded-bl-md border border-line bg-white text-ink"}`}
                        >
                            <p className="text-base break-words">{msg.text}</p>
                            <p className={`text-[10px] mt-1 ${mine ? "text-zinc-400" : "text-muted"}`}>
                                {new Date(msg.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* message likhne ki jagah */}
            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-line p-3">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={500}
                    placeholder="Type a message..."
                    className="flex-1 rounded-full bg-surface px-4 py-3"
                />
                <button
                    type="submit"
                    disabled={sending || !text.trim()}
                    className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white disabled:opacity-40"
                >
                    <IoSend className="h-5 w-5" />
                </button>
            </form>
        </div>
    );
};

export default RideChat