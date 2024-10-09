import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeQuantity } from "../store/cart";
import { Modal, message } from "antd"; // Importing Ant Design components
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export default function Basic() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate the total price based on the quantity and buyPrice of each item
  const totalPrice = cartItems.reduce((total, cartItem) => {
    return total + (cartItem.buyPrice * cartItem.quantity);
  }, 0);

  // Handle deleting an item with confirmation modal
  const handleDelete = (productId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item from the cart?',
      onOk: () => {
        const item = cartItems.find((cartItem) => cartItem.productId === productId);
        if (item.quantity > 1) {
          // Reduce quantity by 1 if more than 1 item exists
          dispatch(changeQuantity({ productId, quantity: item.quantity - 1 }));
        } else {
          // Remove the item if only 1 exists
          dispatch(changeQuantity({ productId, quantity: 0 }));
        }
        message.success("Cart Item deleted successfully"); // Using Ant Design message
      },
    });
  };

  return (
    <section className="min-h-screen h-custom" style={{ backgroundColor: "#fcedee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
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
                        <MdOutlineKeyboardBackspace style={{ marginRight: "5px" }} />
                        Continue shopping
                      </a>
                    </MDBTypography>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">You have {cartItems.length} items in your cart</p>
                      </div>
                    </div>

                    {cartItems.map((cartItem) => {
                      const { name, description, image, buyPrice } = cartItem;

                      return (
                        <MDBCard className="mb-3" key={cartItem.productId}>
                          <MDBCardBody>
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <MDBCardImage
                                  src={image}
                                  fluid
                                  className="rounded-3"
                                  style={{ width: "120px" }}
                                  alt={name}
                                />
                                <div className="ms-3">
                                  <MDBTypography tag="h5">{name}</MDBTypography>
                                  <p className="small text-muted mb-0" style={{ fontSize: "12px" }}>
                                    {description.substring(0, 30)}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center">
                                <div style={{ width: "50px" }}>
                                  <MDBTypography tag="h5" className="fw-normal mb-0">
                                    {cartItem.quantity}
                                  </MDBTypography>
                                </div>
                                <div style={{ width: "80px" }}>
                                  <MDBTypography tag="h5" className="mb-0">
                                    ${(buyPrice * cartItem.quantity).toFixed(2)}
                                  </MDBTypography>
                                </div>
                                <a href="#!" onClick={() => handleDelete(cartItem.productId)} style={{ color: "#cecece" }}>
                                  <MdDeleteOutline />
                                </a>
                              </div>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      );
                    })}
                  </MDBCol>

                  <MDBCol lg="5">
                    <MDBCard className="text-white rounded-3" style={{ backgroundColor: "#dc2626" }}>
                      <MDBCardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBTypography tag="h5" className="mb-0">Card details</MDBTypography>
                        </div>

                        <form className="mt-4">
                          <MDBInput
                            className="mb-4"
                            label="Cardholder's Name"
                            type="text"
                            size="lg"
                            placeholder="Cardholder's Name"
                            contrast
                          />
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

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">$20.00</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total (Incl. taxes)</p>
                          <p className="mb-2">${(totalPrice + 20).toFixed(2)}</p>
                        </div>

                        <MDBBtn color="secondary" block size="lg">
                          <div className="d-flex justify-content-between">
                            <span>${(totalPrice + 20).toFixed(2)}</span>
                            <span>Checkout<i className="fas fa-long-arrow-alt-right ms-2"></i></span>
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
