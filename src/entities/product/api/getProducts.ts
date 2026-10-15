import axios from "axios";
import type { PaginationData } from "../model/types";
import { apiUrl } from "@/shared/api/config";
import { normalizeProduct, type MockApiProduct } from "./normalizeProduct";

const perPage = 8;

async function fetchProducts(params: URLSearchParams): Promise<MockApiProduct[]> {
    try {
        const { data } = await axios.get<MockApiProduct[]>(`${apiUrl}/products`, { params });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404 &&
            (params.has("category") || params.has("title"))) {
            return [];
        }
        throw error;
    }
}

export async function getProducts(queryParams: URLSearchParams): Promise<PaginationData> {
    const filters = new URLSearchParams();
    const categoryId = Number(queryParams.get("category"));
    const searchValue = queryParams.get("search")?.trim();
    const sort = queryParams.get("sort") ?? "-rating";
    const requestedPage = Number(queryParams.get("page") ?? "1");
    const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

    if (categoryId > 0) filters.set("category", String(categoryId));
    if (searchValue) filters.set("title", searchValue);

    const params = new URLSearchParams(filters);
    params.set("sortBy", sort.startsWith("-") ? sort.slice(1) : sort);
    params.set("order", sort.startsWith("-") ? "desc" : "asc");
    params.set("page", String(page));
    params.set("limit", String(perPage));

    const [products, matchingProducts] = await Promise.all([
        fetchProducts(params),
        fetchProducts(filters),
    ]);
    const items = matchingProducts.length;
    const pages = Math.ceil(items / perPage);

    return {
        first: 1,
        prev: page > 1 ? page - 1 : null,
        next: page < pages ? page + 1 : null,
        last: pages || null,
        pages,
        items,
        data: products.map(normalizeProduct),
    };
}
