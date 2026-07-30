import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    categoryId: 0,
    sortType: "-rating"
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategotyId(state, action) {
            state.categoryId = action.payload
        },
        setSort(state, action) {
            state.sortType = action.payload
        },
    }
})

export const { setCategotyId, setSort } = filterSlice.actions
export default filterSlice.reducer