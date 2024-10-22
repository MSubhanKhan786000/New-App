import React, { useEffect, useState } from "react";
import { getSellerProducts } from "../../services/common";
import Chip from "@mui/material/Chip";
import HeroImg from "../../assets/images/seller.jpg";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          {/* div for text on left */}
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
          {/* div for image on right */}
          <div className="">
            <img
              src={HeroImg}
              alt=""
              className="w-[100%] md:w-[550px] xl:w-[650px] md:h-[400px]"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#CCFDFF] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-2 space-x-24 ml-2 mr-2">
        {products.map((product) => {
          return (
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
                    <p className="text-xs text-grey-800">
                      Buy: ${product.buyPrice}
                    </p>
                  )}
                  {product.rentPrice > 0 && (
                    <p className="text-xs text-grey-800">
                      Rent: ${product.rentPrice}/day
                    </p>
                  )}
                </div>
                <div className="flex gap-2 mt-2">
                  <p>Status:</p>
                  {product.approvalStatus === "pending" && (
                    // <Chip color="indigo" value={product.approvalStatus} />
                    <Chip label={product.approvalStatus} color="warning" />
                  )}
                  {product.approvalStatus === "completed" && (
                    // <Chip color="green" value={product.approvalStatus} />
                    <Chip label={product.approvalStatus} color="success" />
                  )}
                  {product.approvalStatus === "rejected" && (
                    // <Chip color="red" value={product.approvalStatus} />
                    <Chip label={product.approvalStatus} color="error" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProductGrid;
