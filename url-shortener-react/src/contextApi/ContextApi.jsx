import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
    const storedToken = localStorage.getItem("JWT_TOKEN");

    let getToken = null;

    try {
        getToken = storedToken ? JSON.parse(storedToken) : null;
    } catch (error) {
        // If token was stored as a normal string
        getToken = storedToken;
    }

    const [token, setToken] = useState(getToken);

    const sendData = {
        token,
        setToken,
    };

    return (
        <ContextApi.Provider value={sendData}>
            {children}
        </ContextApi.Provider>
    );
};

export const useStoreContext = () => {
    return useContext(ContextApi);
};