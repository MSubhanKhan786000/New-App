import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../services/productService";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import RatingComponent from "../components/rating";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid2, Typography } from "@mui/material";
import { notification, Tag } from "antd"; 
import { addToCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../constants/routes";
import { Button } from "react-bootstrap";

const RentDetail = () => {
  const { id } = useParams();
  const [detail, setdetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems,"cartItems quanity");
  

  useEffect(() => {
    const getdetail = async () => {
      try {
        const product = await fetchProductById(id);
        setdetail(product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };
    getdetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!detail) {
    return <div>Product not found.</div>;
  }
  const handleBack = () => {
    navigate(ROUTES.HOME);
  };

  const handleAddToCart = () => {
    const today = new Date();
    const startDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);
  
    if (detail.quantity === 0) {
      notification.error({
        message: "Sorry",
        description: "Item will be available for purchase soon",
        placement: "topRight",
      });
      return;
    }
  
    if (startDate < today || endDate < today) {
      notification.error({
        message: "Invalid Date",
        description: "Please select a valid date range.",
        placement: "topRight",
      });
      return;
    }
  
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;
    const totalRentPrice = days * detail.rentPrice;
  
    // Check if the product is already in the cart with an overlapping date range
    const isDateRangeConflict = cartItems.some((item) => {
      if (item.productId === detail._id) {
        const existingStart = new Date(item.dateRange[0]);
        const existingEnd = new Date(item.dateRange[1]);
  
        // Check for overlapping date ranges
        return (
          (startDate <= existingEnd && endDate >= existingStart) // Overlap condition
        );
      }
      return false;
    });
  
    if (isDateRangeConflict) {
      notification.error({
        message: "Date Conflict",
        description: "This product is already rented for the selected date range.",
        placement: "topRight",
      });
      return;
    }
  
    // Find the existing item in the cart with the exact date range
    const existingCartItem = cartItems.find(
      (item) =>
        item.productId === detail._id &&
        item.dateRange[0]?.toString() === dateRange[0]?.toString() &&
        item.dateRange[1]?.toString() === dateRange[1]?.toString()
    );
  
    if (existingCartItem) {
      notification.error({
        message: "Duplicate Rental",
        description: "You can't rent the product twice for the same days.",
        placement: "topRight",
      });
      return;
    }
  
    const totalQuantityInCart = cartItems
    .filter((item) => item.productId === detail._id)
    .reduce((total, item) => total + item.quantity, 0);
  
    // Calculate the total quantity after this addition
    const newTotalQuantity = totalQuantityInCart + quantity;
  
    // Check if adding more items exceeds available quantity
    if (newTotalQuantity > detail.quantity) {
      notification.error({
        message: "Quantity Limit Reached",
        description: `You can't add more of this product as the stock limit has been reached.`,
        placement: "topRight",
      });
      return;
    }
  
    const cartProduct = {
      productId: detail._id,
      name: detail.name,
      buyPrice: detail.buyPrice,
      rentPrice: totalRentPrice, // Store total rental price for selected days
      category: detail.category,
      image: detail.image,
      description: detail.description,
      quantity,
      dateRange: dateRange,
    };
  
    dispatch(addToCart(cartProduct));
    notification.success({
      message: "Product Added",
      description: "Product has been added to your cart.",
      placement: "topRight",
    });
    setDateRange([null, null]);
  };
  
  

  const updatedRentPrice = detail.rentPrice * quantity;

  return (
    <>
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
                    RENT DETAILS
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
                    <Tag
                      color="#f50"
                      className="text-center w-[100px] mb-1 pt-1 font-bold"
                    >
                      {detail.quantity == 0 ? (
                        <p className="pt-2 text-lg">Sold 😔</p>
                      ) : (
                        <p className="text-justify w-[100px] mb-1 pt-1 font-bold">
                          Items Left: {detail.quantity}
                        </p>
                      )}
                    </Tag>
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: "white",
                        backgroundColor: "green",
                        padding: "0.5rem",
                        borderRadius: "5px",
                        mb: 4,
                        width: "25%",
                        textAlign: "left",
                      }}
                    >
                      Rs. {updatedRentPrice}/day
                    </Typography>

                    <Typography
                      sx={{
                        color: "grey.600",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                      }}
                    >
                      Please Select date range for rent
                    </Typography>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <SingleInputDateRangeField
                        startText="Check-in"
                        endText="Check-out"
                        value={dateRange}
                        onChange={(newRange) => setDateRange(newRange)}
                        format="MM/DD/YYYY"
                      />
                    </LocalizationProvider>

                    <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
                      {/* <button
                        className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 hover:bg-slate-800  mt-2 md:mt-0"
                        onClick={handleAddToCart}
                      >
                        Add To Cart
                      </button> */}
                      <Button
                  variant="danger"
                  className="text-white px-4 py-2 mt-3 no-wrap"
                  style={{ whiteSpace: "nowrap", padding: "-2px 8px" }}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
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
    </>
  );
};

export default RentDetail;
