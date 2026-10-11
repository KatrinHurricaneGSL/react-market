import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit";

import type { CartItem, CartState } from "./types";

const initialState: CartState = {
    totalPrice: 0,
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<CartItem>) {
            state.items.push(action.payload);
        },
        removeProduct(state, action: PayloadAction<number>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearProducts(state) {
            state.items = [];
        }
    }
});

export const { addProduct, removeProduct, clearProducts } = cartSlice.actions;
export default cartSlice.reducer;