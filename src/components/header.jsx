import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { TiShoppingCart } from "react-icons/ti";
import profileIcon from "../assets/images/profile.png";
import logo from "../assets/images/logo.png";
import "../styles/header.css";
import { FiLogOut } from "react-icons/fi";
import { Button } from "react-bootstrap";


const Header = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

const handleProfile = () => {
  navigate("/profile")
}
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
          <Nav className="me-auto ml-10">
            <NavLink className="ms-2 nav-link" as={Link} to="/">
              Home
            </NavLink>
            <NavLink className="ms-2 nav-link" as={Link} to="/products">
              Products
            </NavLink>
            <NavLink className="ms-2 nav-link" as={Link} to="/about">
              About Us
            </NavLink>
            <NavLink className="ms-2 nav-link" as={Link} to="/contact">
              Contact Us
            </NavLink>

            {/* Dropdown for Men */}
            <NavDropdown title="Men" id="men-nav-dropdown">
              <NavDropdown.Item as={Link} to="/men/barat">
                Barat
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/men/mehndi">
                Mehndi
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/men/walima">
                Walima
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/men/nikkah">
                Nikkah
              </NavDropdown.Item>
            </NavDropdown>

            {/* Dropdown for Women */}
            <NavDropdown title="Women" id="women-nav-dropdown">
              <NavDropdown.Item as={Link} to="/women/barat">
                Barat
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/women/mehndi">
                Mehndi
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/women/walima">
                Walima
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/women/nikkah">
                Nikkah
              </NavDropdown.Item>
            </NavDropdown>

            {/* Earn with Us button */}
            {/* <Nav.Link className="bg" onClick={handleEarnWithUsClick}>Earn With Us</Nav.Link> */}
            <Button
            variant="danger"
            className="text-white ml-9"
              onClick={handleEarnWithUsClick}
            >
              Earn With Us
            </Button>
          </Nav>

          {/* Cart and Profile Section */}
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
                  right: "-10px",
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
            <img
              src={profileIcon}
              alt="Profile"
              style={{ width: 30, height: 30 }}
              onClick={handleProfile}
            />
            <Nav.Link onClick={handleLogout} style={{marginLeft:"-10px"}}>
            <FiLogOut color="black" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
