import axios from "axios";
import type { ProductType } from "../model/types";

export async function getProductsByIds(ids: number[], signal?: AbortSignal): Promise<ProductType[]> {
  const products = await Promise.all(ids.map(async (id) => {
    try {
      const { data } = await axios.get<ProductType>(`http://localhost:3000/products/${id}`, { signal });
      return { ...data, id: Number(data.id) };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) return null;
      throw error;
    }
  }));

  return products.filter((product) => product !== null);
}
