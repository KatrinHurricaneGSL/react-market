export { Categories } from "./ui/categories/Categories"
export { Search } from "./ui/search/Search"
export { Sort } from "./ui/sort/Sort"
export { default as filterReducer } from "./model/filterSlice"
export { setCategotyId, setCurrentPage, setSort, resetFilters } from "./model/filterSlice"
export { SearchContext } from "./model/searchContext"

export type { FilterState, SortOption, SortType } from "./model/types"
