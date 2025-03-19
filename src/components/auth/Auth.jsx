import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Box, Button, TextField } from "@mui/material";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const auth = getAuth();

    const handleAuth = async () => {
        try {
            if (isLogin) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("Usuario logueado:", userCredential.user);
                alert("Bienvenido " + userCredential.user.email);
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("Usuario registrado:", userCredential.user);
                alert("Usuario registrado con exito");
            }
        } catch (error) {
            console.error("Error de autenticacion:", error.message);
            alert("Error: " + error.message)
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: "400", margin: "auto" }}>
            <TextField label="Correo electronico" value={email} onChange={(e) => setEmail(e.target.value)}>   
            </TextField>

            <TextField label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></TextField>

            <Button variant="contained" onClick={handleAuth}>
                {isLogin ? "Iniciar Sesion" : "Registrarse"}
            </Button>

            <Button variant="text" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "¿No tienes cuenta? Registrate" : "¿Ya tienes una cuenta? Inicia sesion"}
            </Button>
        </Box>
    );
};

export default Auth;