import { useCallback, useEffect, useState } from "react";

// ek ride ki chat: messages, unread count, aur message bhejna
export const useRideChat = (socket, rideId) => {
    const [messages, setMessages] = useState([]);
    const [unread, setUnread] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    // nayi ride aane par purani chat saaf karo
    useEffect(() => {
        setMessages([]);
        setUnread(0);
    }, [rideId]);

    // saamne wale ka message aaya
    useEffect(() => {
        if (!rideId) return;

        const handleMessage = (msg) => {
            if (msg.rideId !== rideId) return;
            setMessages((prev) => [...prev, msg]);
            if (!isOpen) setUnread((count) => count + 1);
        };

        socket.on("new-message", handleMessage);
        return () => socket.off("new-message", handleMessage);
    }, [socket, rideId, isOpen]);

    // message bhejo; server 5 second mein jawab na de to fail maano
    const sendMessage = useCallback(
        (text) =>
            new Promise((resolve) => {
                socket.timeout(5000).emit("send-message", { rideId, text }, (err, res) => {
                    if (err) return resolve({ ok: false, error: "server not responding" });
                    if (res?.ok) setMessages((prev) => [...prev, res.message]);
                    resolve(res);
                });
            }),
        [socket, rideId]
    );

    const openChat = useCallback(() => {
        setIsOpen(true);
        setUnread(0);
    }, []);

    const closeChat = useCallback(() => setIsOpen(false), []);

    return { messages, unread, isOpen, openChat, closeChat, sendMessage };
};