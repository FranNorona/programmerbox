import { createContext, useState } from "react";

export const MaterialsUpdateContext = createContext();
export const MaterialsUpdateProvider = ({ children }) => {
    const [updateTrigger, setUpdateTrigger] = useState(false);

    const triggerUpdate = () => {
        setUpdateTrigger((prev) => !prev);
    };

    return (
        <MaterialsUpdateContext.Provider value={{ triggerUpdate, updateTrigger }}>
            {children}
        </MaterialsUpdateContext.Provider>
    );
};
