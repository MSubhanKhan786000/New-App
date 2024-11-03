import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ROUTES } from "../constants/routes";

const ComingSoon = () => {
  const navigate = useNavigate();

  const handleBrowseCatalog = () => {
    navigate(ROUTES.HOME); // Navigate to the /coming route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
        Browse Catalog Coming Soon!
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 text-center">
        The Browse Catalog feature is coming soon—stay tuned for an amazing
        experience! You can add your catalogs into the website through this
        feature
      </p>

      {/* Button to navigate to /coming */}
      <Button
        variant="danger"
        className="mt-3 px-4 py-2 text-lg md:text-xl"
        onClick={handleBrowseCatalog}
      >
        Go Back
      </Button>
    </div>
  );
};

export default ComingSoon;
