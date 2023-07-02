import { useState } from "react";
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Link,
} from "@mui/material";
import { Favorite, Logout } from "@mui/icons-material";
import { MouseEvent } from "react";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ColorModeToggle from "./ColorModeToggle";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const { logout, user } = UserAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "space-between",
          px: 6,
        }}
      >
        <Button
          sx={{ fontSize: "20px", my: 1 }}
          color="primary"
          variant="contained"
          href="/"
        >
          Recipes
        </Button>
        <Box>
          <ColorModeToggle />
          {user && (
            <Tooltip title="Options">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: "neutral.light" }}
                  variant="rounded"
                />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem sx={{ cursor: "initial" }}>{user?.email}</MenuItem>
        <MenuItem component={Link} href="/favorites">
          <Favorite sx={{ mr: 1 }} /> Favorites
        </MenuItem>
        <MenuItem component={Link} href="/userRecipes">
          <BookmarksIcon sx={{ mr: 1 }} /> My recipes
        </MenuItem>
        <MenuItem component={Link} onClick={() => handleLogout()}>
          <Logout sx={{ mr: 1 }} /> Log out
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavBar;
