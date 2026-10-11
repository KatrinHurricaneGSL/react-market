import axios from "axios"
import type { PaginationData } from "../model/types"

export async function getProducts(queryParams: URLSearchParams): Promise<PaginationData> {
    const apiParams = new URLSearchParams({
        _sort: queryParams.get("sort") ?? "-rating",
        _page: queryParams.get("page") ?? "1",
        _per_page: "8"
    })

    const categoryId = Number(queryParams.get("category"))
    const searchValue = queryParams.get("search")?.trim()

    if (categoryId > 0) {
        apiParams.set("category:eq", String(categoryId))
    }

    if (searchValue) {
        apiParams.set("title:contains", searchValue)
    }

    const response = await axios.get<PaginationData>(
        `http://localhost:3000/products?${apiParams.toString()}`
    )

    return response.data
}