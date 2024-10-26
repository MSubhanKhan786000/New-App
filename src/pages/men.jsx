import React, { useState } from "react";
import ProductCart from "../components/productCart";
import { fetchProducts } from "../services/productService";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd"; // Import Ant Design spinner
import { Pagination } from "@mui/material";

const Men = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; // Show 5 products per page

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

  // Filter for Men's products with completed approval status
  const menProducts =
    data?.data?.filter(
      (product) =>
        product.category === "Men" && product.approvalStatus === "completed"
    ) || [];

  // Pagination logic
  const totalProducts = menProducts.length;
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = menProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 flex justify-center ml-5 mr-5">
        {currentProducts.map((product) => (
          <ProductCart key={product._id} data={product} />
        ))}
      </div>
      <div className="flex items-center justify-center py-4">
        <Pagination
          color="standard"
          count={Math.ceil(totalProducts / productsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default Men;
