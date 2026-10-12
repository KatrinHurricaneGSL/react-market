import type { FavoriteState } from "./types";

const STORE_FAVORITE_KEY = "favorite"

export function saveFavoriteToStorage(favorite: FavoriteState) {
    sessionStorage.setItem(STORE_FAVORITE_KEY, JSON.stringify(favorite));
}

export function getFavoriteFromStorage() {
    const jsonData = sessionStorage.getItem(STORE_FAVORITE_KEY);
    const favorite: FavoriteState = jsonData ? JSON.parse(jsonData) : { items: [] };
    
    return favorite;
}