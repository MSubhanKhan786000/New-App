import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import iconCart from "../assets/images/iconCart.png";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab } from "../store/cart";
import logo from "../assets/images/logo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import cartIcon from "../assets/images/cart.png";
import profileIcon from "../assets/images/profile.png";
import logoutIcon from "../assets/images/logout.png";
import { HiOutlineLogout } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";
import '../styles/header.css'
const Header = () => {
  const pages = ["Women", "Men", "Products", "About", "Contact"];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useSelector(store => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL path

  const handleCartClick = () => {
    navigate("/cart"); // Navigate to the cart route
  };

  useEffect(() => {
    let total = 0;
    carts.forEach(item => (total += item.quantity));
    setTotalQuantity(total);
  }, [carts]);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleEarnWithUsClick = () => {
    navigate("/earn");
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fcedee" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 2,
              maxWidth: "150px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="success"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages?.map(page => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link
                    to={`/${page.toLowerCase().replace(" ", "")}`}
                    style={{
                      textDecoration: "none",
                      color: "#000000",
                    }}
                  >
                    {page}
                  </Link>
                </MenuItem>
              ))}
              <MenuItem>
                <Button
                  onClick={handleEarnWithUsClick}
                  sx={{
                    color: "yellow",
                    fontWeight: "bold",
                  }}
                >
                  Earn With Us
                </Button>
              </MenuItem>
            </Menu>
          </Box>

          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 2,
              maxWidth: "100px",
            }}
          />

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {pages?.map(page => {
              const pagePath = `/${page.toLowerCase().replace(" ", "")}`;
              const isActive = location.pathname === pagePath;

              return (
                <Link
                  key={page}
                  to={pagePath}
                  style={{
                    color: isActive ? "#ffffff" : "black",
                    textDecoration: "none",
                    margin: "2px",
                    padding: "5px", // Padding for consistency
                    backgroundColor: isActive ? "#dc3545" : "transparent",
                    borderRadius: "4px",
                    display: "inline-block", // Keep it inline but block-like for width control
                    width: "80px", // Fixed width for each tab (adjust as per your design)
                    textAlign: "center", // Center the text within the button
                  }}
                >
                  {page}
                </Link>
              );
            })}

            <Button
            className="button"
              onClick={handleEarnWithUsClick}
              
            >
              Earn with us
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
            <Box
              className="w-8 h-8 bg-red-500 rounded-full flex justify-center items-center relative"
              onClick={handleCartClick}
            >
              <TiShoppingCart size={20} style={{ cursor: "pointer" }} />

              <Box className="absolute top-2/3 right-1/2 bg-yellow-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center">
                {totalQuantity}
              </Box>
            </Box>
            <Box
              component="img"
              src={profileIcon}
              alt="Profile"
              sx={{ width: 30, height: 30 }}
            />
            <nav>
              <HiOutlineLogout onClick={handleLogout} color="red" size={25} />
            </nav>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
