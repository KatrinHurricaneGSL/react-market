import { configureStore } from '@reduxjs/toolkit'

import { filterReducer } from "@/features/catalog-controls"
import { cartReducer } from "@/entities/cart"

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch