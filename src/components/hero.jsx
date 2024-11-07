import React from "react";
import HeroImg from "../assets/images/image.png";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
function Hero() {
  const navigate = useNavigate();
  const handleBrowseCatalog = () => {
    navigate("/coming"); // Navigate to the /coming route
  };
  return (
    <div className="bg-bg">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* div for text on left */}
        <div
          className="
         flex flex-col justify-center items-center text-left md:text-left px-10  md:py-0 md-px-0 md:items-start space-y-2"
        >
          <h3 className="text-white xl:text-4xl font-bold">
            <p>Wedding Dresses for Rent and Buy</p>
          </h3>
          <p className="">
            Elevate your special day with our exquisite wedding dress rentals,
            offering timeless elegance and unforgettable style for every bride.
          </p>
          <Button
            variant="danger"
            className="mt-3"
            onClick={handleBrowseCatalog}
          >
            Browse Catalog
          </Button>
          <p className="text-sm text-red-700">
            Free shipping for orders over Rs. 40,000
          </p>
        </div>
        {/* div for image on right */}
        <div className="">
          <img
            src={HeroImg}
            alt=""
            className="w-[100%] md:w-[550px] xl:w-[650px] md:h-[400px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
