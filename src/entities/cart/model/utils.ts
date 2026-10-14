import type { CartState } from "./types";

export function getCartFromStorage(): CartState {
  return {
    items: JSON.parse(localStorage.getItem("cart") ?? "[]"),
    products: [],
    isLoading: true,
    error: false,
  };
}

export function saveCartToStorage(cart: CartState) {
  localStorage.setItem("cart", JSON.stringify(cart.items));
}
