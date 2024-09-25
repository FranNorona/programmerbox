import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección
import "./login.css";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook para redireccionar

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            (username === import.meta.env.VITE_USER_1 && password === import.meta.env.VITE_PW_USER_1) || 
            (username === import.meta.env.VITE_USER_2 && password === import.meta.env.VITE_PW_USER_2)
        ) {
            onLogin(); // Actualiza el estado de autenticación en el App.js
            navigate("/"); // Redirige a la página de Orders
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div className='form_login_container'>   
            <form className="form_login" onSubmit={handleSubmit}>
                <img src="https://res.cloudinary.com/dmhprmqnk/image/upload/v1726067335/logop_smiqmt.png" alt="logo" />
                <TextField
                    label="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                    variant="standard"
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    variant="standard"
                />
                <Box sx={{ backgroundColor: '#58bc82', borderRadius: '4px', color: 'white' }}>
                    <Button type="submit" variant="contained" color="transparent">Iniciar Sesión</Button>
                </Box>
            </form>
        </div>
    );
};

export default Login;
