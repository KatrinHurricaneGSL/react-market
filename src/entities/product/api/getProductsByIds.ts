import axios from "axios";
import type { ProductType } from "../model/types";

export async function getProductsByIds(ids: number[], signal?: AbortSignal): Promise<ProductType[]> {
  if (ids.length === 0) return [];

  const { data } = await axios.get<ProductType[]>("http://localhost:3000/products", {
    params: {
      _where: JSON.stringify({ id: { in: ids.map(String) } }),
    },
    signal,
  });

  return data.map((product) => ({ ...product, id: Number(product.id) }));
}
