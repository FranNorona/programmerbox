import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import "./login.css";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            (username === import.meta.env.VITE_USER_1 && password === import.meta.env.VITE_PW_USER_1) || 
            (username === import.meta.env.VITE_USER_2 && password === import.meta.env.VITE_PW_USER_2)
        ) {
            onLogin(); // Llama a la función al iniciar sesión
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div className='form_login_container'>
            <form className="form_login" onSubmit={handleSubmit}>
                <TextField
                    label="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
                <Button type="submit" variant="contained">Iniciar Sesión</Button>
            </form>
        </div>
    );
};

export default Login;
