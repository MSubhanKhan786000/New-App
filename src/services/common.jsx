import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const getUserDetails = async () => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      throw new Error("User not logged in.");
    }

    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);

    if (response && response.data) {
      console.log("User details fetched: ", response.data);
      return response.data;
    } else {
      throw new Error("No user details found.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const getSellerProducts = async () => {
  try {
    const sellerId = localStorage.getItem("userId"); // Use userId as sellerId

    if (!sellerId) {
      throw new Error("Seller ID not found.");
    }

    const response = await axios.get(
      `${API_BASE_URL}/seller/getcollection/${sellerId}`
    );

    if (response && response.data) {
      console.log("Seller products fetched: ", response.data);
      return response.data;
    } else {
      throw new Error("No products found for this seller.");
    }
  } catch (error) {
    console.error("Error fetching seller products:", error);
    throw error;
  }
};
