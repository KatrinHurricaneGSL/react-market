import axios from "axios";
import type { ProductType } from "../model/types";
import { apiUrl } from "@/shared/api/config";
import { normalizeProduct, type MockApiProduct } from "./normalizeProduct";

export async function getProductsByIds(ids: number[], signal?: AbortSignal): Promise<ProductType[]> {
  const products = await Promise.all([...new Set(ids)].map(async (id) => {
    try {
      const { data } = await axios.get<MockApiProduct[]>(`${apiUrl}/products`, {
        params: { id: String(id) },
        signal,
      });
      const product = data.find((product) => Number(product.id) === id);
      return product ? normalizeProduct(product) : null;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) return null;
      throw error;
    }
  }));

  return products.filter((product): product is ProductType => product !== null);
}
