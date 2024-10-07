import React from "react";
import ProductCart from "../components/productCart";
import { fetchProducts } from "../services/productService";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error fetching products!</div>;
  }

  const products = data?.data || [];

  return (
    <div>
      <h1 className="text-3xl my-5">List Products</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
        {products.map((product, key) => (
          <ProductCart key={product._id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
