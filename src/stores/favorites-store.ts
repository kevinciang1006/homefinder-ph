"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface FavoritesState {
  ids: string[];
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clear: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  devtools(
    persist(
      (set, get) => ({
        ids: [],
        toggle: (id) =>
          set((state) => {
            const exists = state.ids.includes(id);
            return {
              ids: exists ? state.ids.filter((i) => i !== id) : [...state.ids, id],
            };
          }),
        isFavorite: (id) => get().ids.includes(id),
        clear: () => set({ ids: [] }),
      }),
      {
        name: "hf-favorites",
      }
    ),
    { name: "FavoritesStore" }
  )
);
