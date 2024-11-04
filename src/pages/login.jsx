import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomModal from "../components/common/CustomModal";
import { handleLogin } from "../services/auth";
import Colors from "../constants/Colors";
// Importing eye icons (you can use any icon library, here I'm using FontAwesome)
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ROUTES } from "../constants/routes";

function Login() {
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setModalMessage("Please fill in all fields correctly.");
      setModalType("error");
      setShowModal(true);
    } else {
      event.preventDefault();
      handleLogin(
        formData,
        setLoading,
        setModalMessage,
        setModalType,
        setShowModal,
        navigate
      );
    }

    setValidated(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalType === "success") {
      navigate(ROUTES.HOME);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: Colors.mainColor }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-5 mb-20">
        <p className="text-2xl font-bold text-center mb-4 text-blue-950">
          Login
        </p>
        <p className="text-center text-white mb-4 bg-red-600 rounded-md p-2 ">
          Welcome back! Please login to your account.
        </p>
        <form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md bg-gray-50"
              placeholder="Email"
            />
            <div className="text-red-500 text-xs mt-1 hidden">
              Please provide a valid email.
            </div>
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md bg-gray-50"
              placeholder="Password"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 cursor-pointer text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="text-center">
            <p className="mt-4">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate(ROUTES.SIGNUP)}
                className="text-white  bg-green-700 p-2 rounded-md"
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>

        {showModal && (
          <CustomModal
            type={modalType}
            title={modalType === "success" ? "Success" : "Error"}
            content={modalMessage}
            onClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
}

export default Login;
