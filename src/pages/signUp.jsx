import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CustomModal from "../components/common/CustomModal";
import { useNavigate } from "react-router-dom";
import Colors from "../constants/Colors";
import { handleRegister } from "../services/auth";

function SignUp() {
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    pnumber: "",
    email: "",
    address: "",
    password: "",
    city: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async event => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setModalMessage("Please fill in all fields correctly.");
      setModalType("error");
      setShowModal(true);
    } else {
      event.preventDefault();
      setLoading(true);

      // Pass all required parameters to handleRegister
      await handleRegister(
        formData,
        setLoading,
        setModalMessage,
        setModalType,
        setShowModal
      );
    }

    setValidated(true);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-h-screen"
      style={{
        backgroundColor: Colors.mainColor,
        position: "relative",
      }}
    >
      <div
        className="w-50 border rounded p-4 shadow mt-10 mb-5"
        style={{ backgroundColor: "#fff", borderColor: Colors.mainColor }}
      >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h2
            className="text-center"
            style={{ color: Colors.mainColor, fontWeight: 500 }}
          >
            Sign Up
          </h2>
          <p
            className="text-center p-2 mb-4"
            style={{
              backgroundColor: Colors.secondaryColor,
              color: Colors.backgroundColorLightGray,
              borderRadius: 5,
            }}
          >
            New here? Create an account and get started!
          </p>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="firstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                name="fname"
                placeholder="First name"
                value={formData.fname}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="lastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                name="lname"
                placeholder="Last name"
                value={formData.lname}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                type="tel"
                name="pnumber"
                placeholder="Phone Number"
                pattern="[0-9]{10}"
                value={formData.pnumber}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a phone number in this format(3344567890) without
                0.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid address.
            </Form.Control.Feedback>
          </Form.Group>
          <Row className="mb-3 mt-3">
            <Form.Group as={Col} md="6" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit" className="w-100 mt-4" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Button variant="success" onClick={() => navigate("/login")}>
              Login
            </Button>
          </p>
        </Form>

        {showModal && (
          <CustomModal
            type={modalType}
            title={modalType === "success" ? "Success" : "Error"}
            content={modalMessage}
            onClose={() => {
              setShowModal(false);
              // Navigate only if the modal is of type success
              if (modalType === "success") {
                navigate("/login"); // Navigate to login page after closing the modal
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default SignUp;
