import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getFavoriteFromStorage, saveFavoriteToStorage } from "./utils";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: getFavoriteFromStorage,
  reducers: {
    addFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.ids.includes(id)) state.ids = state.ids.filter((value) => value !== id);
      else state.ids.push(id);
      saveFavoriteToStorage(state);
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.ids = state.ids.filter((id) => id !== action.payload);
      saveFavoriteToStorage(state);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
