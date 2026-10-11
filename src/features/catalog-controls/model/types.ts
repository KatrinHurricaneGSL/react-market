export type SortType = 
    | "-rating"
    | "rating"
    | "-price"
    | "price"
    | "-title"
    | "title"

export interface FilterState {
    categoryId: number;
    currentPage: number;
    sortType: SortType;
}

export interface SortOption {
    id: SortType;
    title: string;
}