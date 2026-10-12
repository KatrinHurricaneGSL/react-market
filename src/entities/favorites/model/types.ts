import type { ProductType } from "@/entities/product/model/types";

export type FavoriteItemType = ProductType & {
  isFavorite: boolean;
};

export type FavoriteState = {
  items: FavoriteItemType[];
};
