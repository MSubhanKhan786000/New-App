import React from "react";
import ProductCart from "../components/productCart";
import { fetchProducts } from "../services/productService";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import Hero from "../components/hero";

const Home = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

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

  return (
    <div>
      <Hero />
      <div className="bg-[#CCFDFF]">
        <p className="text-2xl font-bold text-center pt-4">Our Products</p>
        <p className="text-center md:text-center px-10 pt-2 text-gray">
          Contemporary Pakistani Wedding dresses meticulously handicrafted with
          traditional embellishments and embroidery techniques inspired by the
          subcontinent's heritage. Each carefully crafted dress is designed to
          complement brides' looks on her wedding day.
        </p>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 flex justify-center ml-5 mr-5 px-20">
          {filteredProducts.map((product) => (
            <ProductCart key={product._id} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
