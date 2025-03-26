import { useState } from "react";
import { Drawer, IconButton, AppBar, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PostAddIcon from '@mui/icons-material/PostAdd';
import TodayIcon from '@mui/icons-material/Today';
import navLinks from "../../utils/navLinks/navLinks.json";
import NavListDrawer from "./NavListDrawer";
import Seeker from "../seeker/Seeker";
import AddButton from "../addButton/AddButton"

const iconMap = {
    PostAddIcon: <PostAddIcon />,
    TodayIcon: <TodayIcon />,
};

const navLinksWithIcons = navLinks.map((item) => ({
    ...item,
    icon: iconMap[item.icon],
}));

const NavBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <AppBar className="w-[100vw] !h-20 !sm:h-15 !bg-emerald-400">
                <Toolbar className="w-[100vw] h-[100%] flex justify-between items-center">
                    <IconButton
                        color="inherit"
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon sx={{ fontSize: "30px", color: "white" }} />
                    </IconButton>
                    <Seeker />
                    <AddButton />
                </Toolbar>
            </AppBar>

            <Drawer className="!h-[100vh] bg-stone-950"
                open={open}
                onClose={() => setOpen(false)}>
                <NavListDrawer navLinks={navLinksWithIcons} />
            </Drawer>
        </>
    );
};

export default NavBar;