import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeQuantity } from "../store/cart";
import { Button, message, Modal, Empty } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { ROUTES } from "../constants/routes";

export default function CartTab() {
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate the total price based on either buyPrice or rentPrice
  const calculateTotal = (cartItem) => {
    if (cartItem.buyPrice === "0") {
      return cartItem.rentPrice * cartItem.quantity;
    } else if (cartItem.rentPrice === "null") {
      return cartItem.buyPrice * cartItem.quantity;
    }
    return cartItem.buyPrice * cartItem.quantity; // Default to buyPrice
  };

  const totalPrice = cartItems.reduce((total, cartItem) => {
    return total + calculateTotal(cartItem);
  }, 0);

  // Show confirmation before deleting the item
  const showDeleteConfirm = (cartItem) => {
    Modal.confirm({
      title: `Are you sure you want to delete all of ${cartItem.name} from the cart?`,
      content: "Once deleted, this item will be removed from your cart.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(cartItem.productId);
      },
      onCancel() {
        console.log("Delete cancelled");
      },
    });
  };

  // Handle the delete operation
  const handleDelete = (productId) => {
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

  // Format the dateRange to MM-DD-YYYY format
  const formatDateRange = (dateRange) => {
    if (
      dateRange &&
      dateRange.length === 2 &&
      dateRange[0]?.$d &&
      dateRange[1]?.$d
    ) {
      const startDate = new Date(dateRange[0].$d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const endDate = new Date(dateRange[1].$d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return `${startDate} - ${endDate}`;
    } else {
      return "Added from Buy";
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51QCnDJImRowvxkgSdsdcLkp8jicJZHZxaC25Ad0tnYppAokSgZZLpqlRer5Wg5zUqKb02cFAxtUxSCnbQr20A37l00ysC9Wgbn"
    );

    const body = { products: cartItems };
    const headers = { "Content-Type": "application/json" };

    const response = await fetch(
      "http://localhost:5000/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();

    const result = stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <section className="py-24 bg-[#fff] px-28">
      <div className="w-full max-w-7xl px-4 md:px-5 mx-auto">
        <h2 className="font-bold text-4xl mb-8 text-center">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="text-center mt-16">
            <Empty
              description={
                <span className="text-gray-500 text-xl">
                  Your Cart is Empty
                </span>
              }
            />
            <Button
              type="primary"
              className="mt-8"
              shape="round"
              size="large"
              onClick={() => navigate(ROUTES.PRODUCTS)}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
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
                    <h6 className="text-indigo-600">
                      Rs.{calculateTotal(cartItem).toFixed(2)}
                    </h6>
                    <p className="text-gray-500">
                      {formatDateRange(cartItem.dateRange)}
                    </p>
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
                    Rs.{calculateTotal(cartItem).toFixed(2)}
                  </div>
                  <MdDeleteOutline
                    size={30}
                    className="text-red-400 cursor-pointer"
                    onClick={() => showDeleteConfirm(cartItem)}
                  />
                </div>
              </div>
            ))}

            <div className="bg-gray-50 rounded-xl p-6 mt-6">
              <div className="flex justify-between mt-4">
                <p className="text-2xl font-medium">Total</p>
                <h6 className="text-2xl text-indigo-500">
                  Rs. {totalPrice.toFixed(2)}
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
                onClick={makePayment}
              >
                Continue to Payment
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
