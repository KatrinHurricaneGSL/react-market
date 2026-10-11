export interface ProductType {
    id: number,
    imageUrl: string,
    title: string,
    price: number,
    category: number,
    rating: number
}

export interface PaginationData {
    "first": number,
    "prev": number | null,
    "next": number | null,
    "last": number | null,
    "pages": number,
    "items": number,
    "data": ProductType[]
}