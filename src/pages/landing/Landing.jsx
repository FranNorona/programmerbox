import React, { useState } from "react";
import Orders from "../../components/orders/Orders";
import Login from "../../components/login/Login";

const Landing = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (username, password) => {    
        if (
            (username === import.meta.env.VITE_USER_1 && password === import.meta.env.VITE_PW_USER_1) || 
            (username === import.meta.env.VITE_USER_2 && password === import.meta.env.VITE_PW_USER_2)
        ) {
            setIsAuthenticated(true);
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <>
            {isAuthenticated ? (
                <Orders />
            ) : (
                <div>
                    <h2>Iniciar Sesión</h2>
                    <Login onLogin={handleLogin} />
                </div>
            )}
        </>
    );
};

export default Landing;

