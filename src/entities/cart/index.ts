export { default as cartReducer } from "./model/cartSlice";
export {
  addProduct,
  removeProduct,
  incrementCount,
  decrementCount,
  clearProducts,
  loadCartProducts,
} from "./model/cartSlice";
export type { CartItemType, CartEntry, CartState } from "./model/types";
export {
  selectCartItems,
  selectTotalPrice,
  selectTotalCartItems,
} from "./model/selectors";
