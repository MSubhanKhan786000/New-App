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

      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === product._id // Change from product._id to product.productId
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += product.quantity;
        state.items[existingItemIndex].dateRange = product.dateRange;
      } else {
        state.items.push(product);
      }
      localStorage.setItem("carts", JSON.stringify(state.items));
    },

    changeQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === productId
      );

      if (quantity > 0) {
        state.items[existingItemIndex].quantity = quantity;
      } else {
        // Remove the product from the cart when quantity is 0
        state.items = state.items.filter(
          (item) => item.productId !== productId
        );
      }

      // Update localStorage with the new cart state
      localStorage.setItem("carts", JSON.stringify(state.items));
    },

    toggleStatusTab(state) {
      state.statusTab = !state.statusTab;
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("carts");
    },
  },
});

export const { addToCart, changeQuantity, toggleStatusTab, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
