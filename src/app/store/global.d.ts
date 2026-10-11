import type {
    RootState as StoreState,
    AppDispatch as StoreDispatch,
} from './store';

declare global {
    type RootState = StoreState;
    type AppDispatch = StoreDispatch;
}

export {};