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

  return (
    <div>
      <Hero />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 flex justify-center ml-5 mr-5">
        {products.map((product) => (
          <ProductCart key={product._id} data={product} />
        ))}
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Home;
