import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getProductsByIds } from "@/entities/product";
import type { CartEntry } from "./types";
import { getCartFromStorage, saveCartToStorage } from "./utils";

export const loadCartProducts = createAsyncThunk(
  "cart/loadProducts",
  (ids: number[], { signal }) => getProductsByIds(ids, signal),
);

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromStorage,
  reducers: {
    addProduct(state, action: PayloadAction<CartEntry>) {
      const { id, count } = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (existing) existing.count += count;
      else state.items.push({ id, count });
      saveCartToStorage(state);
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state);
    },
    incrementCount(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.count += 1;
      saveCartToStorage(state);
    },
    decrementCount(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.count > 1) item.count -= 1;
      saveCartToStorage(state);
    },
    clearProducts(state) {
      state.items = [];
      state.products = [];
      saveCartToStorage(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCartProducts.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(loadCartProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(loadCartProducts.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const { addProduct, removeProduct, incrementCount, decrementCount, clearProducts } = cartSlice.actions;
export default cartSlice.reducer;
