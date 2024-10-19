import React, { createContext, useState, useEffect } from "react";
import { getUserDetails } from "../services/common";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  console.log("This is userInfo from context", userInfo);

  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      const details = await getUserDetails();
      setUserInfo(details);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, loading }}>
      {children}
    </UserContext.Provider>
  );
};
