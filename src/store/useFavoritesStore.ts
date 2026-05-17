import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesStore = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) => {
        const prev = get().favorites;
        set({
          favorites:
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
        });
      },
    }),
    { name: "favorites" },
  ),
);
