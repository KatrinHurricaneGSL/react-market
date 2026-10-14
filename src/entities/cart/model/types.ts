import type { ProductType } from "@/entities/product";

export interface CartItem extends ProductType {
  count: number;
}

export interface CartEntry {
  id: number;
  count: number;
}

export interface CartState {
  items: CartEntry[];
  products: ProductType[];
  isLoading: boolean;
  error: boolean;
}
