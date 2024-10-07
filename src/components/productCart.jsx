// productCart.jsx
import React from "react";
import { Link } from "react-router-dom";
import iconCart from "../assets/images/iconCart.png";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cart";

const ProductCart = (props) => {
  const carts = useSelector((store) => store.cart.items);
  const { _id, name, buyPrice, rentPrice, image } = props.data; // Removed slug from here
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: _id,
        quantity: 1,
      })
    );
  };

  // Store product ID in local storage on click
  const handleProductClick = () => {
    localStorage.setItem("selectedProductId", _id);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <Link to={`/detail/${_id}`} onClick={handleProductClick}> {/* Use ID in the URL */}
        <img
          src={image}
          alt={name}
          className="w-full h-80 object-cover object-top drop-shadow-[0_80px_30px_#0007]"
        />
      </Link>
      <h3 className="text-2xl py-3 text-center font-medium">{name}</h3>
      <div className="flex justify-between items-center">
        <div>
          <p>Buy: $<span className="text-2xl font-medium">{buyPrice}</span></p>
          <p>Rent: $<span className="text-xl font-medium">{rentPrice}</span></p>
        </div>
        <button
          className="bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2"
          onClick={handleAddToCart}
        >
          <img src={iconCart} alt="Add to Cart" className="w-5" />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
