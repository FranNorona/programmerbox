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
            <AppBar position="fixed" sx={{ height: { xs: "80px", sm: "70px" },
                        bgcolor: "primary", width:"100vw"}}>
                <Toolbar sx={{
                    width:"100%",
                    height: "100%",
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems: "center",
                    gap:"20px"
                }}>
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

            <Drawer
                open={open}
                anchor="left"
                onClose={() => setOpen(false)}>
                <NavListDrawer navLinks={navLinksWithIcons} />
            </Drawer>
        </>
    );
};

export default NavBar;