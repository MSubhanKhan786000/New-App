import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';  

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
