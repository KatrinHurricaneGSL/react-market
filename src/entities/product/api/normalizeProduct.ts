import type { ProductType } from '../model/types';

export type MockApiProduct = Omit<ProductType, 'id'> & { id: string };

export function normalizeProduct(product: MockApiProduct): ProductType {
  const id = Number(product.id);
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error('MockAPI product must have a positive numeric id');
  }
  return { ...product, id };
}
