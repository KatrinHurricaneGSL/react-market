import type { FavoriteState } from "./types";

export function getFavoriteFromStorage(): FavoriteState {
  return { ids: JSON.parse(localStorage.getItem("favorite") ?? "[]") };
}

export function saveFavoriteToStorage(favorite: FavoriteState) {
  localStorage.setItem("favorite", JSON.stringify(favorite.ids));
}
