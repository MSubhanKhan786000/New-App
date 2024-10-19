import React from "react";

const SellerEarningsPage = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "This is a product for sale.",
      image: "https://via.placeholder.com/150",
      buyPrice: 100,
      rentPrice: 10, // per day
      isRented: false, // false means it's sold
      daysRented: 0, // relevant if rented
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is a product available for rent.",
      image: "https://via.placeholder.com/150",
      buyPrice: 0,
      rentPrice: 15, // per day
      isRented: true,
      daysRented: 5,
    },
    {
      id: 3,
      name: "Product 3",
      description: "This product can be bought.",
      image: "https://via.placeholder.com/150",
      buyPrice: 200,
      rentPrice: 0, // not applicable for rent
      isRented: false,
      daysRented: 0,
    },
    {
      id: 4,
      name: "Product 4",
      description: "This product is rented for 3 days.",
      image: "https://via.placeholder.com/150",
      buyPrice: 0,
      rentPrice: 12,
      isRented: true,
      daysRented: 3,
    },
    {
      id: 5,
      name: "Product 5",
      description: "Available for both rent and sale.",
      image: "https://via.placeholder.com/150",
      buyPrice: 150,
      rentPrice: 20,
      isRented: true,
      daysRented: 4,
    },
  ];

  // Calculate total earnings
  const totalEarnings = products.reduce((acc, product) => {
    if (product.isRented) {
      return acc + product.rentPrice * product.daysRented;
    }
    return acc + product.buyPrice;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Seller Earnings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">{product.description}</p>
              <div className="mt-4">
                {product.isRented ? (
                  <p className="text-gray-900">
                    Rent Price: ${product.rentPrice} / day
                  </p>
                ) : (
                  <p className="text-gray-900">
                    Buy Price: ${product.buyPrice}
                  </p>
                )}
              </div>
              {product.isRented && (
                <p className="text-gray-700">
                  Days Rented: {product.daysRented} days
                </p>
              )}
            </div>
            <div className="bg-gray-200 p-4 text-gray-900">
              Total Earned: $
              {product.isRented
                ? product.rentPrice * product.daysRented
                : product.buyPrice}
            </div>
          </div>
        ))}
      </div>

      {/* Total Earnings Section */}
      <div className="mt-10 bg-white p-6 shadow-md rounded-lg max-w-lg mx-auto">
        <h3 className="text-xl font-semibold text-center">Total Earnings</h3>
        <p className="text-center text-2xl font-bold text-gray-900 mt-4">
          ${totalEarnings}
        </p>
      </div>
    </div>
  );
};

export default SellerEarningsPage;
