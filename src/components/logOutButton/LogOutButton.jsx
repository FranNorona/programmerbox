import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";

const LogOutButton = () => {
    const handleLogout = async () => {
        const auth = getAuth();

        try {
            await signOut(auth);
            alert("Sesion cerrada con exito!");
        } catch (error) {
            console.error("No se pudo cerrar sesion", error.message)
            alert("Hubo un error al cerrar la sesion");
        };
    };

    return (
        <Button variant="contained" color="secondary" onClick={handleLogout}>
            Cerrar Sesion
        </Button>
    );
};

export default LogOutButton;