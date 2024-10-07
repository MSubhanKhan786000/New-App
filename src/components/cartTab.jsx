import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { products } from "../products";
import { changeQuantity } from "../store/cart";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export default function CartTab() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate the total price based on the products in the cart
  const totalPrice = cartItems.reduce((total, cartItem) => {
    const product = products.find(p => p.id === cartItem.productId);
    return total + (product ? product.price * cartItem.quantity : 0);
  }, 0);

  // Handle deletion of a product from the cart
  const handleDelete = productId => {
    dispatch(changeQuantity({ productId, quantity: 0 }));
    toast.success("Item deleted from cart");
  };

  return (
    <section
      className="min-h-screen h-custom"
      style={{ backgroundColor: "#fcedee" }}
    >
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  {/* Left Column for cart items */}
                  <MDBCol lg="7">
                    <MDBTypography tag="h5">
                      <a
                        href="#!"
                        className="text-body"
                        onClick={() => navigate(-1)}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <MdOutlineKeyboardBackspace
                          style={{ marginRight: "5px" }}
                        />
                        Continue shopping
                      </a>
                    </MDBTypography>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">
                          You have {cartItems.length} items in your cart
                        </p>
                      </div>
                    </div>

                    {cartItems?.map((cartItem, index) => {
                      const product = products.find(
                        p => p.id === cartItem.productId
                      );
                      if (!product) return null;

                      return (
                        <MDBCard className="mb-3" key={index}>
                          <MDBCardBody>
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <div>
                                  <MDBCardImage
                                    src={product.image}
                                    fluid
                                    className="rounded-3"
                                    style={{ width: "120px" }}
                                    alt={product.name}
                                  />
                                </div>
                                <div className="ms-3">
                                  <MDBTypography tag="h5">
                                    {product.name}
                                  </MDBTypography>
                                  <p
                                    className="small text-muted mb-0"
                                    style={{ fontSize: "12px" }}
                                  >
                                    {product.description.substring(0, 30)}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center">
                                {/* Quantity Display */}
                                <div style={{ width: "50px" }}>
                                  <MDBTypography
                                    tag="h5"
                                    className="fw-normal mb-0"
                                  >
                                    {cartItem.quantity}
                                  </MDBTypography>
                                </div>
                                {/* Product Price */}
                                <div style={{ width: "80px" }}>
                                  <MDBTypography tag="h5" className="mb-0">
                                    ${product.price * cartItem.quantity}
                                  </MDBTypography>
                                </div>
                                {/* Delete Icon */}
                                <a
                                  href="#!"
                                  onClick={() =>
                                    handleDelete(cartItem.productId)
                                  }
                                  style={{ color: "#cecece" }}
                                >
                                  <MdDeleteOutline />
                                </a>
                              </div>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      );
                    })}
                  </MDBCol>

                  {/* Right Column for order summary and payment form */}
                  <MDBCol lg="5">
                    <MDBCard
                      className="text-white rounded-3"
                      style={{ backgroundColor: "#dc2626" }} // Red-600 color
                    >
                      <MDBCardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBTypography tag="h5" className="mb-0">
                            Card details
                          </MDBTypography>
                        </div>

                        <form className="mt-4">
                          {/* Cardholder's Name */}
                          <MDBInput
                            className="mb-4"
                            label="Cardholder's Name"
                            type="text"
                            size="lg"
                            placeholder="Cardholder's Name"
                            contrast
                          />

                          {/* Card Number */}
                          <MDBInput
                            className="mb-4"
                            label="Card Number"
                            type="text"
                            size="lg"
                            minLength="19"
                            maxLength="19"
                            placeholder="1234 5678 9012 3457"
                            contrast
                          />

                          {/* Expiration and CVV */}
                          <MDBRow className="mb-4">
                            <MDBCol md="6">
                              <MDBInput
                                className="mb-4"
                                label="Expiration"
                                type="text"
                                size="lg"
                                minLength="7"
                                maxLength="7"
                                placeholder="MM/YYYY"
                                contrast
                              />
                            </MDBCol>
                            <MDBCol md="6">
                              <MDBInput
                                className="mb-4"
                                label="Cvv"
                                type="text"
                                size="lg"
                                minLength="3"
                                maxLength="3"
                                placeholder="&#9679;&#9679;&#9679;"
                                contrast
                              />
                            </MDBCol>
                          </MDBRow>
                        </form>

                        <hr />

                        {/* Subtotal, Shipping, and Total Prices */}
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">${totalPrice}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">$20.00</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total (Incl. taxes)</p>
                          <p className="mb-2">${totalPrice + 20}</p>
                        </div>

                        {/* Checkout Button */}
                        <MDBBtn color="secondary" block size="lg">
                          <div className="d-flex justify-content-between">
                            <span>${totalPrice + 20}</span>
                            <span>
                              Checkout
                              <i className="fas fa-long-arrow-alt-right ms-2"></i>
                            </span>
                          </div>
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
