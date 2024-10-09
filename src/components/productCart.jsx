import React from "react"; 
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, message } from "antd"; // Import Modal and message from Ant Design
import { addToCart } from "../store/cart";
import iconCart from "../assets/images/iconCart.png";

const ProductCart = (props) => {
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const { _id, name, buyPrice, rentPrice, image, buyStatus, rentStatus, category, createdAt, description, status, type } = props.data;

  // Function to handle adding product to cart after confirmation
  const handleAddToCart = () => {
    console.log("Product being added to cart:", {
      _id,
      name,
      buyPrice,
      rentPrice,
      image,
      buyStatus,
      rentStatus,
      category,
      createdAt,
      description,
      status,
      type
    });

    dispatch(
      addToCart({
        _id,
        name,
        buyPrice,
        rentPrice,
        image,
        buyStatus,
        rentStatus,
        category,
        createdAt,
        description,
        status,
        type
      })
    );
    message.success("Item added to cart successfully"); // Show success toast
  };

  // Function to show confirmation modal
  const showConfirm = () => {
    Modal.confirm({
      title: "Are you sure to add the product to cart for purchase?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        handleAddToCart(); // Call add to cart function if user confirms
      },
      onCancel() {
        console.log("Cancelled");
      }
    });
  };

  const handleProductClick = () => {
    localStorage.setItem("selectedProductId", _id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm max-w-[300px] mx-2 my-4 pb-3"> 
      <Link to={`/detail/${_id}`} onClick={handleProductClick}> 
        <img
          src={image}
          alt={name}
          className="w-full h-[150px] object-cover object-top rounded-t-xl" 
        />
      </Link>
      <h3 className="text-lg py-2 px-2 font-semibold font-medium">{name}</h3>
      
      {/* Price Section */}
      <div className=" flex gap-2 px-2">
        <p className="text-xs text-grey-800">Buy: ${buyPrice}</p>
        <p className="text-xs text-grey-800">Rent:${rentPrice}/day</p>
      </div>

      {/* Buttons Section */}
      <div className="flex gap-2 px-2">
        <button className="bg-red-500 text-white px-3 py-1 rounded-sm text-sm hover:bg-red-600"> 
          Rent It
        </button>
        <button
          className="border border-red-600 text-red-600 px-3 py-1 rounded-sm text-sm"
          onClick={showConfirm} // Show confirmation modal when clicked
        >
          Buy It
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
