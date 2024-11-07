import React, { useState } from "react";
import ProductCart from "../components/productCart";
import { fetchProducts } from "../services/productService";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import Pagination from "@mui/material/Pagination";
import AdvancedFilter from "../components/AdvanceFilter";
import Filter from "../components/filter";
import { FrownOutlined } from "@ant-design/icons"; 

const Products = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [filter, setFilter] = useState(null); // Existing filter for price sorting
  const [searchText, setSearchText] = useState(""); // State for search text
  const [categoryFilter, setCategoryFilter] = useState(null); // State for category

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

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
    let approvedProducts = allProducts.filter(
      (product) => product.approvalStatus === "completed"
    );

    // Apply search text filter
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      approvedProducts = approvedProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerSearchText) ||
          product.description.toLowerCase().includes(lowerSearchText)
      );
    }

    // Apply category filter
    if (categoryFilter) {
      approvedProducts = approvedProducts.filter((product) => {
        if (categoryFilter === "Men's Collection") {
          return product.category === "Men";
        } else if (categoryFilter === "Women's Collection") {
          return product.category === "Women";
        } else {
          // For other categories
          return product.category === categoryFilter;
        }
      });
    }

    // Existing price sorting logic
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
  const filteredProductList = filteredProducts();
  const currentProducts = filteredProductList.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <>
      <div className="flex flex-col bg-[#f4f2ff] p-2 rounded-lg m-5 ">
        <h2 className="text-2xl font-bold text-red-600 pl-5 ">
          Approved Products
        </h2>
        <p className="text-center text-gray-500">
          Welcome to the ultimate destination for custom T-Shirts that make a
          statement. Add some pizzazz to your wardrobe with personalized T-Shirt
          designs that showcase your unique style and personality. See more
        </p>
      </div>

      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/4 p-4 mt-28">
          <AdvancedFilter
            onFilterChange={setFilter} // Keep existing logic
            onSearchTextChange={setSearchText} // New prop for search text
            onCategoryChange={setCategoryFilter} // New prop for category filter
          />
        </div>
        <div className="w-full lg:w-3/4 p-4">
          <div className="flex justify-end mb-4">
            <Filter onFilterChange={setFilter} /> 
          </div>

          {currentProducts.length > 0 ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
              {currentProducts.map((product) => (
                <ProductCart key={product._id} data={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <FrownOutlined
  style={{ fontSize: "80px", color: "#999", marginBottom: "20px" }}
/>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                No Products Found
              </h2>
              <p className="text-gray-500 text-center">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </div>
          )}
        </div>
      </div>

      {currentProducts.length > 0 && (
        <div className="flex items-center justify-center py-4">
          <Pagination
            color="standard"
            count={Math.ceil(filteredProductList.length / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </div>
      )}
    </>
  );
};

export default Products;
