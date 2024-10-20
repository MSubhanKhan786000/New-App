import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, message, Button } from "antd";
import { addToCart } from "../store/cart";

const ProductCart = (props) => {
  const carts = useSelector((store) => store.cart.items);
  console.log("These are carts from redux store", carts);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const {
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
    type,
  } = props.data;

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
      type,
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
        type,
      })
    );
    message.success("Item added to cart successfully");
  };

  const showConfirm = () => {
    Modal.confirm({
      title: "Are you sure to add the product to cart for purchase?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        handleAddToCart();
      },
      onCancel() {
        console.log("Cancelled");
      },
    });
  };

  const handleRentClick = () => {
    if (!rentPrice || isNaN(rentPrice)) {
      navigate("/not-found");
    } else {
      navigate(`/rentDetail/${_id}`);
    }
  };

  const handleBuyClick = () => {
    if (buyPrice === "0") {
      navigate(`/rentDetail/${_id}`);
    } else {
      navigate(`/detail/${_id}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm max-w-[300px] mx-2 my-4 pb-3">
      <img
        src={image}
        alt={name}
        className="w-full h-[150px] object-cover object-top rounded-t-xl"
        onClick={handleBuyClick}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h3 className="text-lg py-2 px-2 font-semibold font-medium">{name}</h3>
      </div>

      <div className="flex gap-2 px-2">
        {buyPrice && buyPrice > 0 && (
          <p className="text-xs text-grey-800">Buy: ${buyPrice}</p>
        )}
        {rentPrice && rentPrice > 0 && (
          <p className="text-xs text-grey-800">Rent: ${rentPrice}/day</p>
        )}
      </div>

      <div className="flex gap-2 px-2">
        {!rentPrice || isNaN(rentPrice) ? (
          <Button type="primary" disabled>
            Rent It
          </Button>
        ) : (
          <Button color="danger" variant="solid" onClick={handleRentClick}>
            Rent It
          </Button>
        )}

        {buyPrice === "0" ? (
          <Button type="primary" disabled onClick={showConfirm}>
            Buy It
          </Button>
        ) : (
          <Button color="danger" variant="outlined" onClick={showConfirm}>
            Buy It
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCart;
