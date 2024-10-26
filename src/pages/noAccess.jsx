import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const NoAccess = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, the page you're looking for is unavailable.
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={handleBack}
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default NoAccess;
