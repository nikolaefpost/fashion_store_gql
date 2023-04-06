import React, {createContext,  useContext, useEffect, useState} from "react";

const UserContext = createContext({});

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({});
    const storage = window.localStorage;

    const handleSetUser = (user) => {
        setUser(user)
        storage.setItem("currentUser", JSON.stringify(user));
    }

    const deleteUser = () => {
        setUser({})
        storage.currentUser = null;
    }

    useEffect(()=>{
         if (storage.getItem("currentUser")) {
             setUser(JSON.parse(storage.getItem("currentUser")));
         }
    },[])

    const value = { user, handleSetUser, deleteUser };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);