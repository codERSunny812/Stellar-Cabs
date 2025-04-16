import { createContext, useState } from "react";


export const CaptionContext = createContext(null);


export const CaptionContextProvider = ({ children }) => {
    const [captionData, setCaptionData] = useState(null);
    return (
        <CaptionContext.Provider value={{ captionData, setCaptionData }}>
            {children}
        </CaptionContext.Provider>
    )
}