import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],
  statusTab: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      console.log("222222222222222222222",product);
      
      const indexProductId = state.items.findIndex(
        (item) => item.productId === product._id
      );

      console.log("index",indexProductId);
        state.items.push({
          productId: product._id,
          name: product.name,
          buyPrice: product.buyPrice,
          rentPrice: product.rentPrice,
          category: product.category,
          status: product.status,
          image: product.image,
          buyStatus: product.buyStatus,
          rentStatus: product.rentStatus,
          createdAt: product.createdAt,
          description: product.description,
          type: product.type,
          quantity: 1, // Start with a default quantity of 1
        });
      // }

      // Store the complete product data in localStorage
      localStorage.setItem("carts", JSON.stringify(state.items));
    },

    changeQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      );

      if (quantity > 0) {
        state.items[indexProductId].quantity = quantity;
      } else {
        state.items = state.items.filter((item) => item.productId !== productId);
      }

      // Update localStorage with full product data
      localStorage.setItem("carts", JSON.stringify(state.items));
    },

    toggleStatusTab(state) {
      state.statusTab = !state.statusTab;
    },
  },
});

export const { addToCart, changeQuantity, toggleStatusTab } = cartSlice.actions;
export default cartSlice.reducer;
