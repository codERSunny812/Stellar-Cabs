import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

// poore app ke liye ek hi connection
const socket = io(import.meta.env.VITE_BASE_URL);

export const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on("connect", () => console.log("socket connected:", socket.id));
        socket.on("disconnect", () => console.log("socket disconnected"));

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};