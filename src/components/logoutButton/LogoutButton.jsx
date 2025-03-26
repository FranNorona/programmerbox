import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
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
        <Button className=" !w-[80%] !text-emerald-500 !text-xs !bg-[white]" variant="contained" onClick={handleLogout}>
            Cerrar Sesion
            <LogoutIcon />
        </Button>
    );
};

export default LogoutButton;