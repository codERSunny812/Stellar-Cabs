import { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";

// user aur driver dono ke liye ek hi chat screen
// me = "user" ya "caption", taaki apne message right side dikhein
const RideChat = ({ title, me, messages, onSend, onClose }) => {
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);
    const bottomRef = useRef(null);

    // naya message aate hi neeche scroll karo
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
            {/* top bar */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                <IoIosArrowRoundBack className="h-9 w-9 cursor-pointer" onClick={onClose} />
                <h2 className="text-lg font-semibold capitalize">{title}</h2>
            </div>

            {/* messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-gray-50">
                {messages.length === 0 && (
                    <p className="text-center text-gray-400 mt-10">no messages yet</p>
                )}

                {messages.map((msg, index) => {
                    const mine = msg.from === me;
                    return (
                        <div
                            key={index}
                            className={`max-w-[75%] px-3 py-2 rounded-2xl ${mine ? "self-end bg-black text-white" : "self-start bg-gray-200 text-black"
                                }`}
                        >
                            <p className="text-base break-words">{msg.text}</p>
                            <p className={`text-[10px] mt-1 ${mine ? "text-gray-300" : "text-gray-500"}`}>
                                {new Date(msg.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            {/* message likhne ki jagah */}
            <form onSubmit={handleSend} className="flex items-center gap-2 p-3 border-t border-gray-200">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={500}
                    placeholder="type a message..."
                    className="flex-1 bg-[#eee] px-4 py-3 rounded-full outline-none"
                />
                <button
                    type="submit"
                    disabled={sending || !text.trim()}
                    className="bg-black text-white p-3 rounded-full disabled:opacity-50"
                >
                    <IoSend className="h-5 w-5" />
                </button>
            </form>
        </div>
    );
};

export default RideChat