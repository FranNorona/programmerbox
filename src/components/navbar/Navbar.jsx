import { Link, useNavigate } from "react-router-dom";
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import IconButton from "@mui/material/IconButton";
import "./navbar.css";

const Navbar = ({ onLogout, loggedUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    const profilePics = {
        Franco: import.meta.env.VITE_PIC_USER_1,
        Gabriel: import.meta.env.VITE_PIC_USER_2,
    };

    const userRoles = {
        Franco: "Analista de Planeamiento",
        Gabriel: "Jefe de Planeamiento",
    }

    const defaultProfilePic = import.meta.env.VITE_PIC_DEFAULT;

    const profilePicsUrl = profilePics[loggedUser] || defaultProfilePic;

    const userRole = userRoles[loggedUser] || "Usuario";

    return (
        <div className="navbar_container">

            <div className="profile_container">
                <img src={profilePicsUrl} alt={`${loggedUser} profile`} />
                <div className="profile_info">
                    <h3>{loggedUser}</h3>
                    <h4>{userRole}</h4>
                </div>  
            </div>
            
            <div className="links_container">
                <div className="options_container">
                    <Link to="/" className="links">Pedidos</Link>
                    <Link to="/granel" className="links">Graneles</Link>
                </div>         
                <div>
                    <IconButton className="links_container" onClick={handleLogout}><PowerSettingsNewOutlinedIcon /></IconButton>
                </div>    
            </div>
        </div>
    );
}

export default Navbar;
