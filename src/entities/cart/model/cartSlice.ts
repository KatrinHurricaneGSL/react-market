import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { CartItem, CartState } from "./types";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementCount(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.count += 1;
      }
    },
    decrementCount(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.count > 1) {
        item.count -= 1;
      }
    },
    clearProducts(state) {
      state.items = [];
    },
  },
});

export const {
  addProduct,
  removeProduct,
  incrementCount,
  decrementCount,
  clearProducts,
} = cartSlice.actions;
export default cartSlice.reducer;
