import type { ProductType } from "@/entities/product";

export interface CartItem extends ProductType {
    count: number;
}

export interface CartState {
    items: CartItem[]
}
