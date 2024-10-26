import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, changeQuantity } from "../store/cart"; // Import actions
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import { ROUTES } from "../constants/routes";

function Success() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  // useEffect(() => {

  //   updateQuantities();
  // }, [cartItems, dispatch]);
  const updateQuantities = async () => {
    try {
      const productIds = cartItems.map((item) => item.productId);
      console.log("Product Ids from success", cartItems);

      const response = await fetch("http://localhost:5000/update-quantity", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds }),
      });

      const data = await response.json();
      if (data.success) {
        data.updatedProducts.forEach((item) => {
          dispatch(
            changeQuantity({
              productId: item.productId,
              quantity: item.quantity,
            })
          );
        });
        console.log("Quantity updated successfullupdate");
        navigate(ROUTES.HOME);
        dispatch(clearCart());
      } else {
        message.error("Failed to update quantities in the backend");
      }
    } catch (error) {
      console.error("Error updating quantities:", error);
      message.error("Error updating quantities");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md mx-auto text-center">
        <CheckCircleOutlined className="text-green-500 text-6xl" />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your payment was successfully processed.
        </p>
        <Button
          onClick={updateQuantities}
          type="primary"
          className="mt-8"
          shape="round"
          size="large"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

export default Success;
