import type { ImageSlide } from "@/shared/types";

export interface ProductType {
  id: number;
  imageUrl: string;
  images?: ImageSlide[];
  title: string;
  price: number;
  rating: number;
  category: number;
  caption: string;
  description: string;
  characteristics: ProductCharacteristic[];
}

export type ProductCharacteristic = {
  title: string;
  value: string | number;
};

export interface PaginationData {
  first: number;
  prev: number | null;
  next: number | null;
  last: number | null;
  pages: number;
  items: number;
  data: ProductType[];
}
