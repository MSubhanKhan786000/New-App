import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart";

const ProductCart = (props) => {
  const dispatch = useDispatch();
  const { _id, name, buyPrice, rentPrice, image, buyStatus, rentStatus } = props.data;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id,
        name,
        buyPrice,
        rentPrice,
        image,
        buyStatus,
        rentStatus
      })
    );
  };

  const handleProductClick = () => {
    localStorage.setItem("selectedProductId", _id);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-2 w-60 "> {/* Adjusted width and margin */}
      <Link to={`/detail/${_id}`} onClick={handleProductClick}>
        {/* Image covering 70% of the card */}
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover" 
        />
      </Link>

      {/* Product details */}
      <div className="p-2">
        {/* Product name */}
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        
        {/* Pricing */}
        <div className=" text-gray-600">
          <p className="text-sm">Buy: <span className="font-bold">${buyPrice}</span></p>
          <p className="text-sm">Rent: <span className="font-bold">${rentPrice}/day</span></p>
        </div>

        {/* Action buttons */}
        <div className="mt-2 flex justify-between">
          <button
            className="bg-red-500 text-white text-sm py-1 px-3 rounded-sm w-full mr-2 hover:bg-red-600"
            onClick={handleAddToCart}
          >
            Rent It
          </button>
          <button
            className="bg-white text-red-500 border-2 text-sm border-red-500 py-1 px-3 rounded-sm w-full hover:bg-red-500 hover:text-red "
            onClick={handleAddToCart}
          >
            Buy It
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
