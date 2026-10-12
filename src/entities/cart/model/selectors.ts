export const selectTotalPrice = (state: RootState): number => {
  const items = state.cart.items;
  return items.reduce((total, item) => total + item.price * item.count, 0);
};

export const selectTotalCartItems = (state: RootState) => {
  const items = state.cart.items;
  return items.reduce((total, item) => total + item.count, 0);
};
