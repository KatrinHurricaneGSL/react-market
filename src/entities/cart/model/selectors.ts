import { createSelector } from "@reduxjs/toolkit";

export const selectCartItems = createSelector(
  [(state: RootState) => state.cart.items, (state: RootState) => state.cart.products],
  (entries, products) => entries.flatMap((entry) => {
    const product = products.find((product) => product.id === entry.id);
    return product ? [{ ...product, count: entry.count }] : [];
  }),
);

export const selectTotalPrice = (state: RootState): number | null => {
  const { items, products, isLoading, error } = state.cart;
  if (items.length === 0) return 0;
  if (isLoading || error) return null;
  if (items.some((item) => !products.some((product) => product.id === item.id))) return null;

  return items.reduce((sum, item) => {
    const product = products.find((product) => product.id === item.id)!;
    return sum + product.price * item.count;
  }, 0);
};

export const selectTotalCartItems = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.count, 0);
