import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeQuantity } from "../store/cart";
import { Button, message } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export default function CartTab() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, cartItem) => {
    return total + cartItem.buyPrice * cartItem.quantity;
  }, 0);

  const handleDelete = (productId) => {
    // Remove the specific item from the cart
    dispatch(changeQuantity({ productId, quantity: 0 }));
    message.success("Cart item deleted successfully");
  };

  const handleDecreaseQuantity = (cartItem) => {
    if (cartItem.quantity <= 1) {
      message.error("The item quantity is at its lowest.");
    } else {
      dispatch(
        changeQuantity({
          productId: cartItem.productId,
          quantity: cartItem.quantity - 1,
        })
      );
    }
  };

  const handleIncreaseQuantity = (cartItem) => {
    dispatch(
      changeQuantity({
        productId: cartItem.productId,
        quantity: cartItem.quantity + 1,
      })
    );
  };

  return (
    <section className="py-24 bg-[#fff] px-28">
      <div className="w-full max-w-7xl px-4 md:px-5 mx-auto">
        <h2 className="font-bold text-4xl mb-8 text-center">Shopping Cart</h2>

        <div className="hidden lg:grid grid-cols-2 py-6">
          <div className="text-xl text-gray-500">Product</div>
          <div className="flex justify-between">
            <span className="text-xl text-gray-500">Quantity</span>
            <span className="text-xl text-gray-500">Total</span>
          </div>
        </div>

        {cartItems.map((cartItem) => (
          <div
            key={cartItem.productId}
            className="grid grid-cols-1 lg:grid-cols-2 py-6 border-t border-gray-200"
          >
            <div className="flex items-center gap-6">
              <img
                src={cartItem.image}
                alt={cartItem.name}
                className="w-[140px] rounded-xl"
              />
              <div>
                <h5 className="font-semibold text-xl">{cartItem.name}</h5>
                <p className="text-gray-500">{cartItem.description}</p>
                <h6 className="text-indigo-600">${cartItem.buyPrice}</h6>
              </div>
            </div>

            <div className="flex justify-between items-center gap-6">
              <div className="flex items-center">
                <button
                  className="px-6 py-2 border rounded-l-full"
                  onClick={() => handleDecreaseQuantity(cartItem)}
                >
                  -
                </button>
                <input
                  type="text"
                  value={cartItem.quantity}
                  className="w-12 text-center border-y border-gray-300"
                  readOnly
                />
                <button
                  className="px-6 py-2 border rounded-r-full"
                  onClick={() => handleIncreaseQuantity(cartItem)}
                >
                  +
                </button>
              </div>
              <div className="text-indigo-600 font-bold">
                ${cartItem.buyPrice * cartItem.quantity}
              </div>
              <MdDeleteOutline
                size={30}
                className="text-red-400 cursor-pointer"
                onClick={() => handleDelete(cartItem.productId)}
              />
            </div>
          </div>
        ))}

        <div className="bg-gray-50 rounded-xl p-6 mt-6">
          <div className="flex justify-between mt-4">
            <p className="text-2xl font-medium">Total</p>
            <h6 className="text-2xl text-indigo-500">
              ${totalPrice.toFixed(2)}
            </h6>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <Button
            shape="round"
            variant="solid"
            color="danger"
            size="middle"
            onClick={() => message.info("Coupon feature coming soon")}
          >
            Add Coupon Code
          </Button>
          <Button
            variant="solid"
            color="primary"
            shape="round"
            size="middle"
            onClick={() => message.success("Proceeding to payment")}
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </section>
  );
}
