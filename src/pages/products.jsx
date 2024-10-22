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
  console.log("data from products page", data);

  const [filter, setFilter] = useState(null); // Track selected filter

  // Centered loader spinner
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

  const allProducts = data?.data || [];

  // Function to handle filtering logic
  const filteredProducts = () => {
    // Filter products to only show those with approvalStatus === "completed"
    const approvedProducts = allProducts.filter(
      (product) => product.approvalStatus === "completed"
    );

    if (!filter) return approvedProducts;

    const normalizePrice = (price) => {
      // Convert to number and handle edge cases
      return Number(price) || 0; // Returns 0 if price is null, undefined, or "0"
    };

    switch (filter) {
      case "rentLow":
        return [...approvedProducts].sort(
          (a, b) => normalizePrice(a.rentPrice) - normalizePrice(b.rentPrice)
        );
      case "rentHigh":
        return [...approvedProducts].sort(
          (a, b) => normalizePrice(b.rentPrice) - normalizePrice(a.rentPrice)
        );
      case "buyLow":
        return [...approvedProducts].sort(
          (a, b) => normalizePrice(a.buyPrice) - normalizePrice(b.buyPrice)
        );
      case "buyHigh":
        return [...approvedProducts].sort(
          (a, b) => normalizePrice(b.buyPrice) - normalizePrice(a.buyPrice)
        );
      default:
        return approvedProducts;
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
