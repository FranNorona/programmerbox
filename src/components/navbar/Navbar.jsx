import { Link, useNavigate } from "react-router-dom";
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import IconButton from "@mui/material/IconButton";
import "./navbar.css";

const Navbar = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    return (
        <div className="navbar_container">
            <img src="https://res.cloudinary.com/dmhprmqnk/image/upload/v1726067335/logop_smiqmt.png" alt="logo" />
            <ul>
                <li>
                    <Link className="links_container" to="/">Pedidos</Link>
                </li>
                <li>
                    <Link className="links_container" to="/granel">Graneles</Link>
                </li>
                <li>
                    <IconButton className="links_container" onClick={handleLogout}><PowerSettingsNewOutlinedIcon /></IconButton>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
