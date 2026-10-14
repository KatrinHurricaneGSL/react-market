import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "@/features/catalog-controls";
import { cartReducer } from "@/entities/cart";
import { favoriteReducer } from "@/entities/favorites";
import { productPreviewReducer } from "@/features/product-preview";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
    productPreview: productPreviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
