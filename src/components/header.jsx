import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { TiShoppingCart } from "react-icons/ti";
import profileIcon from "../assets/images/profile.png";
import logo from "../assets/images/logo.png";
// import "../styles/header.css";
import { FiLogOut } from "react-icons/fi";
import { Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext"; // Import UserContext

const Header = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext); // Get userInfo from UserContext

  const handleCartClick = () => {
    navigate("/cart");
  };

  useEffect(() => {
    let total = 0;
    carts.forEach((item) => (total += item.quantity));
    setTotalQuantity(total);
  }, [carts]);

  const handleEarnWithUsClick = () => {
    navigate("/earn");
  };

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Remove userId from localStorage
    window.location.href = "/login";
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <Navbar expand="lg" className="bg-header-bg">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>
          <img
            src={logo}
            alt="Logo"
            style={{ maxWidth: "150px", cursor: "pointer" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ml-10 space-x-4">
            {/* Conditional rendering based on user role */}
            {userInfo?.role === "user" ? (
              <>
                <NavLink className="ms-2 nav-link" as={Link} to="/">
                  Home
                </NavLink>
                <NavLink className="ms-2 nav-link" as={Link} to="/products">
                  Products
                </NavLink>
                <NavLink
                  className="ms-2 nav-link"
                  as={Link}
                  to="/about"
                  style={{ whiteSpace: "nowrap" }}
                >
                  About Us
                </NavLink>
                <NavLink
                  className="ms-2 nav-link"
                  as={Link}
                  to="/contact"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Contact Us
                </NavLink>

                <NavDropdown title="Men" id="men-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/men">
                    Barat
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/men">
                    Mehndi
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/men">
                    Walima
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/men">
                    Nikkah
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Women" id="women-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/women">
                    Barat
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/women">
                    Mehndi
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/women">
                    Walima
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/women">
                    Nikkah
                  </NavDropdown.Item>
                </NavDropdown>

                <Button
                  variant="danger"
                  className="text-white ml-9 no-wrap"
                  style={{ whiteSpace: "nowrap", padding: "-2px 8px" }}
                  onClick={() => {
                    navigate("/signup"); // Navigate to signup
                    localStorage.removeItem("userId"); // Remove userId from localStorage
                  }}
                >
                  Become Seller
                </Button>
              </>
            ) : userInfo?.role === "seller" ? (
              <>
                <NavLink
                  className="ms-2 nav-link"
                  as={Link}
                  to="/sellerProducts"
                >
                  Products
                </NavLink>
                <NavLink
                  className="ms-2 nav-link"
                  as={Link}
                  to="/sellerEarnings"
                >
                  Earnings
                </NavLink>
                <NavLink className="ms-2 nav-link" as={Link} to="/about">
                  About Us
                </NavLink>
                <NavLink className="ms-2 nav-link" as={Link} to="/contact">
                  Contact Us
                </NavLink>

                <Button
                  variant="danger"
                  className="text-white ml-9"
                  onClick={handleEarnWithUsClick}
                >
                  Earn With Us
                </Button>
              </>
            ) : null}
          </Nav>
          <Nav className="d-flex align-items-center gap-3">
            {/* Cart and Profile Section */}
            {userInfo?.role === "user" && (
              <Nav className="d-flex align-items-center gap-3">
                <div
                  onClick={handleCartClick}
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  <TiShoppingCart size={20} />
                  <span
                    className="badge bg-yellow-500 text-white text-sm"
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-12px",
                      backgroundColor: "#ffc107",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {totalQuantity}
                  </span>
                </div>
              </Nav>
            )}
            <img
              src={profileIcon}
              alt="Profile"
              style={{ width: 30, height: 30 }}
              onClick={handleProfile}
            />
            <Nav.Link onClick={handleLogout} style={{ marginLeft: "-10px" }}>
              <FiLogOut color="black" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
