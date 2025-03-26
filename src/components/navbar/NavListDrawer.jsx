import { Box, ListItemButton, ListItemIcon } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LogoutButton from "../logoutButton/LogoutButton";

const NavListDrawer = ({ navLinks }) => {
  return (
    <Box className="!w-42 !h-[100vh] text-[white] bg-emerald-400">
      <nav className="flex flex-col justify-between items-center h-[80%] !p-2">
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