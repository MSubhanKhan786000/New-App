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
import { FiLogOut } from "react-icons/fi";
import { Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext"; // Import UserContext
import { getMenuItems } from "../services/common"; // Import the new service
import { ROUTES } from "../constants/routes";

const Header = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [menuItems, setMenuItems] = useState([]); // State to hold menu items as an array
  const carts = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext); // Get userInfo from UserContext

  const handleCartClick = () => {
    navigate(ROUTES.CART);
  };

  useEffect(() => {
    let total = 0;
    carts.forEach((item) => (total += item.quantity));
    setTotalQuantity(total);
  }, [carts]);

  // Fetch menu items on component mount
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await getMenuItems();
        if (response && Array.isArray(response.data)) {
          setMenuItems(response.data); // Set fetched menu items if it's an array
        } else {
          console.error("Fetched menu items is not an array:", response.data);
          setMenuItems([]); // Reset to an empty array if not
        }
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
        setMenuItems([]); // Reset to an empty array on error
      }
    };

    fetchMenuItems();
  }, []);

  const handleEarnWithUsClick = () => {
    navigate(ROUTES.EARN);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Remove userId from localStorage
    window.location.href = "/login";
  };

  const handleProfile = () => {
    navigate(ROUTES.PROFILE);
  };

  return (
    <Navbar expand="lg" className="bg-header-bg">
      <Container>
        <Navbar.Brand onClick={() => navigate(ROUTES.HOME)}>
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
                <NavLink className="ms-2 nav-link" as={Link} to={ROUTES.HOME}>
                  Home
                </NavLink>
                <NavLink
                  className="ms-2 nav-link"
                  as={Link}
                  to={ROUTES.PRODUCTS}
                >
                  Products
                </NavLink>
                <NavLink
                  className="ms-2 nav-link"
                  as={Link}
                  to={ROUTES.ABOUT_US}
                >
                  About Us
                </NavLink>
                <NavLink
                  className="ms-2 nav-link"
                  as={Link}
                  to={ROUTES.CONTACT_US}
                >
                  Contact Us
                </NavLink>

                <NavDropdown title="Men" id="men-nav-dropdown">
                  <NavDropdown.Item as={Link} to={ROUTES.MEN}>
                    Nikkah
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={ROUTES.MEN}>
                    Rasm
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={ROUTES.MEN}>
                    Mehndi
                  </NavDropdown.Item>
                  {menuItems
                    .filter((item) => item.category === "Men") // Filter for Men category
                    .map((item) => (
                      <NavDropdown.Item
                        key={item._id}
                        as={Link}
                        to={ROUTES.MEN}
                      >
                        {item.name}
                      </NavDropdown.Item>
                    ))}
                </NavDropdown>

                <NavDropdown title="Women" id="women-nav-dropdown">
                  <NavDropdown.Item as={Link} to={ROUTES.WOMEN}>
                    Nikkah
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={ROUTES.WOMEN}>
                    Rasm
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={ROUTES.WOMEN}>
                    Mehndi
                  </NavDropdown.Item>
                  {menuItems
                    .filter((item) => item.category === "Women") // Filter for Women category
                    .map((item) => (
                      <NavDropdown.Item
                        key={item._id}
                        as={Link}
                        to={ROUTES.WOMEN}
                      >
                        {item.name}
                      </NavDropdown.Item>
                    ))}
                </NavDropdown>

                <Button
                  variant="danger"
                  className="text-white ml-9 no-wrap"
                  style={{ whiteSpace: "nowrap", padding: "-2px 8px" }}
                  onClick={() => {
                    navigate(ROUTES.SIGNUP); // Navigate to signup
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
                  to={ROUTES.SELLER_PRODUCTS}
                >
                  Products
                </NavLink>
                <NavLink
                  className="ms-2 nav-link"
                  as={Link}
                  to={ROUTES.SELLER_EARNINGS}
                >
                  Earnings
                </NavLink>
                <NavLink
                  className="ms-2 nav-link"
                  as={Link}
                  to={ROUTES.ABOUT_US}
                >
                  About Us
                </NavLink>
                <NavLink
                  className="ms-2 nav-link"
                  as={Link}
                  to={ROUTES.CONTACT_US}
                >
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
