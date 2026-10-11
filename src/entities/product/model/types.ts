export interface BaseProduct {
    imageUrl: string,
    title: string,
    price: number,
}

export interface ProductType extends BaseProduct {
    id: number,
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