import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FavoriteState } from "./types";
import { getFavoriteFromStorage, saveFavoriteToStorage } from "./utils";
import type { ProductType } from "@/entities/product/model/types";

const initialState: FavoriteState = getFavoriteFromStorage();

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<ProductType>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.isFavorite = !existingItem.isFavorite;
      } else {
        state.items.push({
          ...action.payload,
          isFavorite: true,
        });
      }

      saveFavoriteToStorage(state);
    },

    removeFavorite(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);

      saveFavoriteToStorage(state);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
