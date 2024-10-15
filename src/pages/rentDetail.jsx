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

const RentDetail = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);
  const navigate = useNavigate();


  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const product = await fetchProductById(id);
        setProductDetail(product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };
    getProductDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!productDetail) {
    return <div>Product not found.</div>;
  }

  const handleMinusQuantity = () => {
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  };

  const handlePlusQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleBack = () => {
    navigate("/");
  };

  const updatedRentPrice = productDetail.rentPrice * quantity;

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
                      src={productDetail.image}
                      alt={productDetail.name}
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
                        {productDetail.name}
                      </h3>
                      <RatingComponent />
                    </div>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: "white",
                        backgroundColor: "green",
                        padding: "0.5rem",
                        borderRadius: "5px",
                        mb: 4,
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      ${updatedRentPrice}/day
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
                      <Grid2 className="flex mt-2 gap-2 items-center">
                        <button
                          className="bg-gray-200 h-8 w-8 font-bold text-lg rounded-lg flex justify-center items-center transition duration-300 hover:bg-gray-300"
                          onClick={handleMinusQuantity}
                        >
                          -
                        </button>
                        <span className="bg-gray-100 h-8 w-8 font-bold text-lg rounded-lg flex justify-center items-center">
                          {quantity}
                        </span>
                        <button
                          className="bg-gray-200 h-8 w-8 font-bold text-lg rounded-lg flex justify-center items-center transition duration-300 hover:bg-gray-300"
                          onClick={handlePlusQuantity}
                        >
                          +
                        </button>
                      </Grid2>
                      <button className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 hover:bg-slate-800 md:ml-4 mt-2 md:mt-0">
                        Add To Cart
                      </button>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      {productDetail.description}
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
