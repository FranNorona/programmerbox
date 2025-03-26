import { Box, ListItemButton, ListItemIcon } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LogoutButton from "../logoutButton/LogoutButton";

const NavListDrawer = ({ navLinks }) => {
  return (
    <Box className="flex flex-col items-center !w-42 text-[white] bg-emerald-400" sx={{height: "100vh"}}>
      <nav className="flex flex-col items-center justify-between h-[100vh] !p-2">
        <List>
          {navLinks.map((item) => (
            <ListItem disablePadding key={item.title}>
              <ListItemButton component="a" href={item.path}>
                <ListItemIcon sx={{ color: "inherit", marginRight: "-25px"}}>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <LogoutButton />
      </nav>
    </Box>
  );
};

export default NavListDrawer;