import React, { useState } from "react";
import ProductCart from "../components/productCart";
import { fetchProducts } from "../services/productService";
import { useQuery } from "@tanstack/react-query";
import { Spin, Button } from "antd";
import Hero from "../components/hero";
import Reviews from "../components/Reviews";

const Home = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  console.log(data);
  

  // State to keep track of visible products count
  const [visibleCount, setVisibleCount] = useState(5);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching products!</div>;
  }

  const products = data?.data || [];

  // Filter products to only show those with approvalStatus === "completed"
  const filteredProducts = products.filter(
    (product) => product.approvalStatus === "completed"
  );

  // Show only the number of products defined by visibleCount
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // Function to handle Show More button click
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <div>
      <Hero />
      <div className="bg-[#CCFDFF]">
        <p className="text-2xl font-bold text-center pt-4">Our Products</p>
        <p className="text-center md:text-center px-10 pt-2 text-gray">
          Contemporary Pakistani Wedding dresses meticulously handcrafted with
          traditional embellishments and embroidery techniques inspired by the
          subcontinent's heritage. Each carefully crafted dress is designed to
          complement the bride's look on her wedding day.
        </p>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 flex justify-center ml-5 mr-5 px-20">
          {visibleProducts.map((product) => (
            <ProductCart key={product._id} data={product} />
          ))}
        </div>
        {visibleCount < filteredProducts.length && (
          <div className="flex items-center justify-center py-4">
            <Button color="danger" variant="solid" onClick={handleShowMore}>
              Show More
            </Button>
          </div>
        )}
        <div className="pt-10 pb-10">
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default Home;
