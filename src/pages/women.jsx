import React from "react";
import ProductCart from "../components/productCart";
import { fetchProducts } from "../services/productService";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd"; // Import Ant Design spinner

const Women = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

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

  // Filter for Women's products with completed approval status
  const womenProducts =
    data?.data?.filter(
      (product) =>
        product.category === "Women" && product.approvalStatus === "completed"
    ) || [];

  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 flex justify-center ml-5 mr-5">
        {womenProducts.map((product) => (
          <ProductCart key={product._id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Women;
