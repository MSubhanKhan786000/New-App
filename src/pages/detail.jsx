import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cart";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import RatingComponent from "../components/rating";
import { notification, Tag, Modal } from "antd";
import { ROUTES } from "../constants/routes";

const { confirm } = Modal;

const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await fetchProductById(id);
        setDetail(response);
      } catch (error) {
        console.error("Error fetching product details:", error);
        navigate(ROUTES.HOME);
      }
    };
    getProductDetails();
  }, [id, navigate]);

  const cartItems = useSelector((state) => state.cart.items);
  console.log("Cart tems id check", cartItems);

  // Function to handle the confirmation alert
  const showConfirm = () => {
    confirm({
      title: "Do you want to add this item to the cart?",
      content: `You are about to add ${detail.name} to your cart.`,
      onOk() {
        handleAddToCartConfirmed();
      },
      onCancel() {
        console.log("Add to cart cancelled");
      },
    });
  };

  // Function to handle adding the item to the cart after confirmation
  const handleAddToCartConfirmed = () => {
    if (detail.quantity === 0) {
      notification.error({
        message: "Sorry",
        description: "Item will be available for purchase soon",
        placement: "topRight",
      });
      return;
    }
  
    if (detail && detail._id) {
      const existingProduct = cartItems.find(
        (item) => item.productId === detail._id
      );
      const currentCartQuantity = existingProduct ? existingProduct.quantity : 0;
      const isRental = !!detail.dateRange; // Determine if the item is being rented by checking `dateRange`
  
      if (isRental) {
        // Rental condition: Check if quantity limit is reached for rental
        if (currentCartQuantity + quantity > detail.quantity) {
          notification.error({
            message: "Rental Limit Reached",
            description: `You can't add more rentals of this product as the stock limit has been reached.`,
            placement: "topRight",
          });
          return;
        }
        
        // Add the rental item to the cart, including dateRange
        dispatch(
          addToCart({
            productId: detail._id,
            name: detail.name,
            buyPrice: detail.buyPrice,
            rentPrice: detail.rentPrice,
            image: detail.image,
            description: detail.description,
            quantity: currentCartQuantity + quantity,
            dateRange: detail.dateRange, // Include dateRange for rentals
          })
        );
      } else {
        // Buy condition: Check if quantity limit is reached for purchase
        if (currentCartQuantity + quantity > detail.quantity) {
          notification.error({
            message: "Purchase Limit Reached",
            description: `You can't add more of this product for purchase as the stock limit has been reached.`,
            placement: "topRight",
          });
          return;
        }
  
        // Add the buy item to the cart without dateRange
        dispatch(
          addToCart({
            productId: detail._id,
            name: detail.name,
            buyPrice: detail.buyPrice,
            image: detail.image,
            description: detail.description,
            quantity: currentCartQuantity + quantity,
          })
        );
      }
  
      // Success notification for adding item to cart
      notification.success({
        message: "Added to Cart",
        description: `${detail.name} has been added to your cart.`,
        placement: "topRight",
      });
    } else {
      console.error("Product ID is missing!");
    }
  };
  
  

  const handleBack = () => {
    navigate(ROUTES.HOME);
  };

  if (!detail) {
    return (
      <div className="text-center text-xl">Loading product details...</div>
    );
  }

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
                <div className="text-body">
                  <button onClick={handleBack} className="mr-5">
                    <MdOutlineKeyboardBackspace className="text-2xl text-gray-600 hover:text-gray-800" />
                  </button>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "grey",
                      textAlign: "center",
                      marginTop: "-30px",
                    }}
                  >
                    PRODUCT DETAILS
                  </p>
                </div>
                <hr />

                <MDBRow className="mt-5">
                  <MDBCol lg="6" className="flex justify-center">
                    <img
                      src={detail.image}
                      alt={detail.name}
                      className="w-[500px] rounded-lg shadow-lg"
                    />
                  </MDBCol>
                  <MDBCol
                    lg="6"
                    className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-md"
                  >
                    <Tag
                      color="#f50"
                      className="text-center w-[100px] mb-1 pt-1 font-bold"
                    >
                      {detail.quantity == 0 ? (
                        <p>No Item Left</p>
                      ) : (
                        <p className="text-justify w-[100px] mb-1 pt-1 font-bold">
                          Items Left: {detail.quantity}
                        </p>
                      )}
                    </Tag>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3 className="text-4xl uppercase font-bold mb-3">
                        {detail.name}
                      </h3>
                      <RatingComponent />
                    </div>
                    <p className="font-bold text-3xl text-green-600 mb-4">
                      Rs. {detail.buyPrice}
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
                      <button
                        className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 hover:bg-slate-800  mt-2 md:mt-0"
                        onClick={showConfirm} // Call confirmation modal on button click
                      >
                        Add To Cart
                      </button>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      {detail.description}
                    </p>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Detail;
