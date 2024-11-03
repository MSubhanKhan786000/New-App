import axiosInstance from "../utils/axiosInstance";

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
    const response = await axiosInstance.post("/singginupp", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Full response:", response); // Log the full response

    // Check if the response has a success message
    if (response.message === "User created successfully") {
      setModalMessage(
        "Sign Up Successfully. Click Ok to navigate to the Login Screen."
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
    const response = await axiosInstance.post("/loggering", formData, {
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
