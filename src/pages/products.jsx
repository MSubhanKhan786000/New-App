import React, { useState } from "react";
import ProductCart from "../components/productCart";
import { fetchProducts } from "../services/productService";
import { useQuery } from "@tanstack/react-query";
import Filter from "../components/filter";
import { Spin } from "antd";
import Pagination from "@mui/material/Pagination";

const Products = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [filter, setFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 7;

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

  const filteredProducts = () => {
    const approvedProducts = allProducts.filter(
      (product) => product.approvalStatus === "completed"
    );

    if (!filter) return approvedProducts;

    const normalizePrice = (price) => Number(price) || 0;

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Get the current products based on the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts().slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div>
      <Filter onFilterChange={setFilter} />

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 flex justify-center ml-5 mr-5">
        {currentProducts.map((product) => (
          <ProductCart key={product._id} data={product} />
        ))}
      </div>
      <div className="flex items-center justify-center py-4">
        <Pagination
          color="standard"
          count={Math.ceil(filteredProducts().length / productsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default Products;
