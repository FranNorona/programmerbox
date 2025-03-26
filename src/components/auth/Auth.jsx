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
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <Box className="flex flex-col justify-center items-center !pt-15 gap-4">
            <TextField className="w-[80%]" label="Correo electronico" value={email} onChange={(e) => setEmail(e.target.value)}>   
            </TextField>

            <TextField className="w-[80%]" label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></TextField>

            <Button className="!bg-emerald-500 !w-[80%]" variant="contained" onClick={handleAuth}>
                {isLogin ? "Iniciar Sesion" : "Registrarse"}
            </Button>

            <Button variant="text" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "¿No tienes cuenta? Registrate" : "¿Ya tienes una cuenta? Inicia sesion"}
            </Button>
        </Box>
    );
};

export default Auth;