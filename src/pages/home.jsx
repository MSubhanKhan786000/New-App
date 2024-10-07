import React from "react";
import { products } from "../products";
import ProductCart from "../components/productCart";
import { fetchProducts } from "../services/productService";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  console.log(
    "Fetched Products from Api Response:",
    JSON.stringify(data, null, 2)
  );
  return (
    <div>
      <h1 className="text-3xl my-5">List Products</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
        {products.map((product, key) => (
          <ProductCart key={key} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
