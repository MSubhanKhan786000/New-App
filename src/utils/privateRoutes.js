import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Import UserContext
import { ROUTES } from "../constants/routes";

function PrivateRoutes({ children, allowedRoles }) {
  const { userInfo, loading } = useContext(UserContext);

  // Seller route handling comes first
  if (userInfo && userInfo.role === "SELLER") {
    return <Navigate to="/seller" />;
  }

  const userHasRequireRole =
    userInfo &&
    Array.isArray(allowedRoles) &&
    allowedRoles.includes(userInfo.role.toUpperCase());

  if (!userInfo) {
    return <Navigate to={ROUTES.HOME} />;
  }

  if (!userHasRequireRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoutes;
