import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sortType: "-rating"
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategotyId(state, action) {
            state.categoryId = action.payload
            state.currentPage = 1
        },
        setSort(state, action) {
            state.sortType = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        }
    }
})

export const { setCategotyId, setSort, setCurrentPage } = filterSlice.actions
export default filterSlice.reducer