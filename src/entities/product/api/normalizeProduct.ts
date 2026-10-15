import type { ProductType } from '../model/types';

export type MockApiProduct = Omit<ProductType, 'id'> & { id: string | number };

function resolveImageUrl(url: string): string {
  if (!import.meta.env.DEV) return url;

  const filename = new URL(url).pathname.split('/').pop();
  return `${import.meta.env.BASE_URL}images/${filename}`;
}

export function normalizeProduct(product: MockApiProduct): ProductType {
  const id = Number(product.id);
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error('MockAPI product must have a positive numeric id');
  }
  return {
    ...product,
    id,
    imageUrl: resolveImageUrl(product.imageUrl),
    images: product.images?.map((image) => ({
      ...image,
      original: resolveImageUrl(image.original),
      thumbnail: resolveImageUrl(image.thumbnail),
    })),
  };
}
