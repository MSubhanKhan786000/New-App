import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { fetchProductById } from "../services/productService"; 
import { useDispatch } from "react-redux";
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

const Detail = () => {
  const { id } = useParams(); 
  const [detail, setDetail] = useState([]);

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
        navigate("/"); 
      }
    };
    getProductDetails();
  }, [id, navigate]); 

  const handleMinusQuantity = () => {
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  };

  const handlePlusQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (detail) {
      dispatch(
        addToCart({
          productId: detail._id,
          quantity: quantity,
        })
      );
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (!detail) {
    return <div className="text-center text-xl">Loading product details...</div>;
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
                  <p style={{fontSize:"18px",fontWeight:"bold",color:"grey",textAlign:"center", marginTop:"-30px"}}>PRODUCT DETAILS</p>
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
                  <MDBCol lg="6" className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-md">
                    <div style={{display:"flex",alignItems:"center", justifyContent:"space-between"}}>
                    <h3 className="text-4xl uppercase font-bold mb-3">{detail.name}</h3>
                    <RatingComponent  />
                    </div>
                    <p className="font-bold text-3xl text-green-600 mb-4">
                      ${detail.buyPrice || detail.rentPrice}
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
                      <div className="flex gap-2 items-center">
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
                      </div>
                      <button
                        className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 hover:bg-slate-800 md:ml-4 mt-2 md:mt-0"
                        onClick={handleAddToCart}
                      >
                        Add To Cart
                      </button>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">{detail.description}</p> {/* Adjusted text size */}
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
