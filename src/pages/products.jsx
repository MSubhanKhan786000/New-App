import React, { useState } from "react";
import ProductCart from "../components/productCart";
import { fetchProducts } from "../services/productService";
import { useQuery } from "@tanstack/react-query";
import Filter from "../components/filter";
import { Spin } from "antd"; // Import Ant Design spinner

const Products = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  
  const [filter, setFilter] = useState(null); // Track selected filter

  // Centered loader spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen"> {/* Center the spinner */}
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching products!</div>;
  }

  const allProducts = data?.data || [];

  // Function to handle filtering logic
  const filteredProducts = () => {
    if (!filter) return allProducts;

    switch (filter) {
      case 'rentLow':
        return [...allProducts].sort((a, b) => a.rentPrice - b.rentPrice);
      case 'rentHigh':
        return [...allProducts].sort((a, b) => b.rentPrice - a.rentPrice);
      case 'buyLow':
        return [...allProducts].sort((a, b) => a.buyPrice - b.buyPrice);
      case 'buyHigh':
        return [...allProducts].sort((a, b) => b.buyPrice - a.buyPrice);
      default:
        return allProducts;
    }
  };

  return (
    <div>
      <Filter onFilterChange={setFilter} />
      
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 flex justify-center ml-5 mr-5">
        {filteredProducts().map((product) => (
          <ProductCart key={product._id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
