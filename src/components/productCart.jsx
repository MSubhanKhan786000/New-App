import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, message, Button } from "antd";
import { addToCart } from "../store/cart";
import { ROUTES } from "../constants/routes";

const ProductCart = (props) => {
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    _id,
    name,
    buyPrice,
    rentPrice,
    image,
    quantity, // Ensure quantity is passed from the parent component
  } = props.data;

  const cartItem = carts.find((item) => item.productId === _id);
  const cartQuantity = cartItem ? cartItem.quantity : 0; // Get the quantity from the cart or 0 if not present

  const handleAddToCart = () => {
    const availableQuantity = quantity - cartQuantity; // Calculate available quantity

    if (availableQuantity <= 0) {
      message.error("Product is out of stock. Will be available soon.");
      return;
    }

    dispatch(
      addToCart({
        _id,
        name,
        buyPrice,
        rentPrice,
        image,
        quantity: 1,
      })
    );
    console.log("product id from product Cart", _id);

    message.success("Item added to cart successfully");
  };

  const showConfirm = () => {
    const availableQuantity = quantity - cartQuantity;

    if (availableQuantity <= 0) {
      message.error("Product is out of stock. Will be available soon.");
      return;
    }

    Modal.confirm({
      title: "Are you sure you want to add the product to your cart?",
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
    if (quantity <= 0) {
      message.error("Product is out of stock. Will be available soon.");
    } else if (!rentPrice || isNaN(rentPrice)) {
      navigate(ROUTES.NOT_FOUND);
    } else {
      navigate(`/rentDetail/${_id}`);
    }
  };

  const handleBuyClick = () => {
    if (quantity <= 0) {
      message.error("Product is out of stock. Will be available soon.");
    } else if (buyPrice === "0") {
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
          <p className="text-xs text-grey-800">Buy: Rs. {buyPrice}</p>
        )}
        {rentPrice && rentPrice > 0 && (
          <p className="text-xs text-grey-800">Rent: Rs. {rentPrice}/day</p>
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
