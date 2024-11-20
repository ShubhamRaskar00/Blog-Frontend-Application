import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DialogBox from "./DialogBox";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isDialog, setIsDialog] = useState(false);
  const [isPost, setIsPost] = useState(false)
  const navigate = useNavigate();
  const menus = [
    {
      label: "Logout",
      actions: () => {
        localStorage.removeItem("token");
        navigate("/");
      },
    },
  ];

  const initialValues = {
    title: "",
    subTitle: "",
    tags: "",
    content: "",
  };

  //   Toggle menu
  const handleMenuToggle = (event) => {
    setIsOpen(!isOpen);
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenDiaLogBox = () => {
    setIsPost(true)
    setIsDialog(!isDialog);
  };
  return (
    <AppBar position="static" color="white">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/home" className="w-20 block">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LoGO
              </Typography>
            </Link>
          </Box>
          <Box sx={{ mr: "10px" }}>
            <Tooltip title="Create post">
              <IconButton onClick={handleOpenDiaLogBox}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleMenuToggle}>
              <Avatar
                alt="Profile image"
                src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
              />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              anchorEl={anchorElNav}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(isOpen)}
              onClose={handleMenuToggle}
            >
              {menus.map((menu) => (
                <MenuItem
                  key={menu}
                  onClick={(event) => {
                    menu.actions();
                    handleMenuToggle(event);
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {menu.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <DialogBox
        handleOpenClose={handleOpenDiaLogBox}
        openBox={isDialog}
        initialValues={initialValues}
        isPost={isPost}
      />
    </AppBar>
  );
}

export default Header;
