import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { FilterState, SortType } from "./types"

const initialState: FilterState = {
    categoryId: 0,
    currentPage: 1,
    sortType: "-rating"
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        resetFilters() {
            return initialState;
        },
        setCategotyId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
            state.currentPage = 1;
        },
        setSort(state, action: PayloadAction<SortType>) {
            state.sortType = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        }
    }
})

export const { setCategotyId, setSort, setCurrentPage, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
