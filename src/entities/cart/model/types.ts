export interface CartItem {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    count: number;
}

export interface CartState {
    totalPrice: number;
    items: CartItem[]
}