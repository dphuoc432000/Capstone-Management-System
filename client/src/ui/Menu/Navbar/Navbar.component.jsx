import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import RoundedAvatar from "../../Avatar/RoundedAvatar/RoundedAvatar.component";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar({ isShownSidebarIcon, openSidebar }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const isLogedIn = useSelector((state) => state.isLogedIn);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div className={styles["navbar_info-bar"]}>
        <div className="row m-0">
          <div className="col-3">
            {" "}
            <RoundedAvatar
              style={{ width: "45px", height: "45px" }}
              src=""
              name="Test Test"
            />
          </div>
          <div className="col-9">
            <h5 className="mb-1">Le Viet</h5>
            <p className="m-0">leviet@gmail.com</p>
          </div>
        </div>
        <div className="dropdown-divider" />
        <MenuItem onClick={handleMenuClose}>
          <GridViewOutlinedIcon></GridViewOutlinedIcon>
          <span>Dashboard</span>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ContactPageOutlinedIcon></ContactPageOutlinedIcon>
          <span>Profile</span>
        </MenuItem>
        <div className="dropdown-divider" />
        <MenuItem onClick={handleMenuClose}>
          <LogoutOutlinedIcon></LogoutOutlinedIcon>
          <span>Logout</span>
        </MenuItem>
      </div>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <div className={styles["navbar_info-bar"]}>

        <MenuItem onClick={handleMenuClose}>
          <HomeOutlinedIcon />
          <span>Home</span>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <InfoOutlinedIcon />
          <span>About</span>
        </MenuItem>
      </div>
    </Menu>
  );

  return (
    <Box className={styles["navbar"] + " main-navbar"} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isShownSidebarIcon ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={openSidebar}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            ""
          )}

          <h5 className={styles["navbar_logo"]}>CMS</h5>
          <Box sx={{ display: { xs: "none", md: "none" } }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex" }}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <NavLink className="d-flex m-auto light-text" style={{padding:"12px"}} to="/home">Home</NavLink>
              <NavLink className="d-flex m-auto light-text" style={{padding:"12px"}} to="/about">About</NavLink>
              <NavLink className="d-flex m-auto light-text" style={{padding:"12px"}} to="/dashboard">Dashboard</NavLink>
            </Box>


            {isLogedIn ? (
              <>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <RoundedAvatar src="" name="David Kain" />
                </IconButton>
              </>
            ) : (
              <>
                <span style={{ padding: "12px" }}>Login</span>
                <span style={{ padding: "12px" }}>Register</span>
                <Button sx={{ bgcolor: "white" }}>Try Now</Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
