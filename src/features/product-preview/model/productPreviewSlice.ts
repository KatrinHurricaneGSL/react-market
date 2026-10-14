import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "@/entities/product";

type ProductPreviewState = {
  product: ProductType | null;
};

const initialState: ProductPreviewState = {
  product: null,
};

const productPreviewSlice = createSlice({
  name: "productPreview",
  initialState,
  reducers: {
    openProductPreview(state, action: PayloadAction<ProductType>) {
      state.product = action.payload;
    },
    closeProductPreview(state) {
      state.product = null;
    },
  },
  selectors: {
    selectPreviewProduct: (state) => state.product,
  },
});

export const { openProductPreview, closeProductPreview } = productPreviewSlice.actions;
export const { selectPreviewProduct } = productPreviewSlice.selectors;
export default productPreviewSlice.reducer;
