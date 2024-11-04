import axiosInstance from "../utils/axiosInstance";

// verify email endpoint
export const verifyEmail = async (code) => {
  try {
    const response = await axiosInstance.post("/verifyEmail", { code }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Internal server error");
    }
  }
};

export const handleRegister = async (
  formData,
  setLoading,
  setModalMessage,
  setModalType,
  setShowModal
) => {
  let modalAlreadyShown = false;

  try {
    setLoading(true);
    const response = await axiosInstance.post("/signUp", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Full response:", response); // Log the full response

    // Check if the response has a success message
    if (response.message === "User created successfully") {
      setModalMessage(
        "Verification email has been sent to your Gmail account. Please verify your account by entering the 6-digit code."
      );
      setModalType("success");
      if (!modalAlreadyShown) {
        modalAlreadyShown = true;
        setShowModal(true); 
      }
    } else {
      setModalMessage(
        "Registration failed: " + (response.data.message || "Unknown error")
      );
      setModalType("error");
      if (!modalAlreadyShown) {
        modalAlreadyShown = true;
        setShowModal(true);
      }
    }
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.data.message === "Email already exists") {
        setModalMessage(
          "Email already exist. Try a different authentic email please."
        );
        setModalType("error");
        if (!modalAlreadyShown) {
          modalAlreadyShown = true;
          setShowModal(true); 
        }
      } else {
        setModalMessage("An error occurred during registration");
        setModalType("error");
        if (!modalAlreadyShown) {
          modalAlreadyShown = true;
          setShowModal(true); 
        }
      }
    } else {
      setModalMessage("An error occurred during registration");
      setModalType("error");
      if (!modalAlreadyShown) {
        modalAlreadyShown = true;
        setShowModal(true);
      }
    }
  } finally {
    setLoading(false);
  }
};

export const handleLogin = async (
  formData,
  setLoading,
  setModalMessage,
  setModalType,
  setShowModal,
  navigate
) => {
  let modalAlreadyShown = false;

  try {
    setLoading(true);
    // post http:localhost:5000/login => post,put,delete, get, patch
    const response = await axiosInstance.post("/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Full login response: ", response);

    if (response && response.message === "Login successful") {
      setModalMessage("You have successfully logged in.");
      setModalType("success");
      setShowModal(true);

      setTimeout(() => {
        navigate("/", { state: { user: response.fname } });
        localStorage.setItem("userId", response.userId);
      }, 2000);
    } else {
      setModalMessage(
        "Login failed: " + (response?.message || "Unknown error")
      );
      setModalType("error");
      setShowModal(true);
    }
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.data.message === "Invalid Credentials") {
        setModalMessage("Invalid Credentials");
        setModalType("error");
        if (!modalAlreadyShown) {
          modalAlreadyShown = true;
          setShowModal(true);
        }
      } else {
        setModalMessage("An error occurred during Login");
        setModalType("error");
        if (!modalAlreadyShown) {
          modalAlreadyShown = true;
          setShowModal(true);
        }
      }
    } else {
      setModalMessage("An error occurred during login");
      setModalType("error");
      if (!modalAlreadyShown) {
        modalAlreadyShown = true;
        setShowModal(true);
      }
    }
  } finally {
    setLoading(false);
  }
};
