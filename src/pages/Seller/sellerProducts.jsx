import React, { useEffect, useState } from "react";
import { getSellerProducts } from "../../services/common";
import Chip from "@mui/material/Chip";
import HeroImg from "../../assets/images/seller.jpg";
import InfoIcon from "@mui/icons-material/Info"; // Import an icon for visual indication
import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const productCart = () => {
    navigate('/earn')
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getSellerProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <>
      <div className="bg-bg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div
            className="
         flex flex-col justify-center items-center text-left md:text-left px-10 py-20 md:py-0 md-px-0 md:items-start
        md:pr-24 space-y-2"
          >
            <h3 className="text-white xl:text-4xl font-bold">
              <p>Join Our Dress Seller Marketplace</p>
            </h3>
            <p className="">
              Become a part of our vibrant community of dress sellers! Showcase
              your unique styles and reach a broader audience eager to discover
              your fabulous designs.
            </p>

            <p className="text-sm text-red-700">
              Start selling today and let your creations shine!
            </p>
          </div>
          <div className="">
            <img
              src={HeroImg}
              alt=""
              className="w-[100%] md:w-[550px] xl:w-[650px] md:h-[400px]"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#CCFDFF] flex flex-col items-center justify-center min-h-screen p-4">
        {/* "Listed Products" header with styling */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Listed Products</h2>
        
        {/* Check if there are any products */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-2 space-x-24 ml-2 mr-2">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-sm max-w-[300px] mx-2 my-4 pb-3"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[250px] object-cover object-top rounded-t-xl"
                />
                <div className="flex flex-col p-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-xs text-grey-800">{product.description}</p>
                  <div className="flex gap-2">
                    {product.buyPrice > 0 && (
                      <p className="text-xs text-grey-800">Buy: Rs.{product.buyPrice}</p>
                    )}
                    {product.rentPrice > 0 && (
                      <p className="text-xs text-grey-800">Rent: Rs. {product.rentPrice}/day</p>
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="mt-3">Status:</p>
                    {product.approvalStatus === "pending" && (
                      <Chip label="Pending Approval" color="warning" />
                    )}
                    {product.approvalStatus === "approved" && (
                      <Chip label="Approved" color="success" />
                    )}
                    {product.approvalStatus === "rejected" && (
                      <Chip label="Rejected" color="error" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center mt-16">
            <Empty
              description={
                <span className="text-gray-500 text-xl">
                  Sorry you have not added any Product for approval. Add products through Earn With Us
                </span>
              }
            />
            <Button
              type="primary"
              className="mt-8"
              shape="round"
              size="large"
              onClick={productCart}
            >
              Add Product
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductGrid;
