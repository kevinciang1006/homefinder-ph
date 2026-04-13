"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CompareState {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useCompareStore = create<CompareState>()(
  devtools(
    persist(
      (set) => ({
        ids: [],
        add: (id) =>
          set((state) => {
            if (state.ids.length >= 3 || state.ids.includes(id)) return state;
            return { ids: [...state.ids, id] };
          }),
        remove: (id) =>
          set((state) => ({ ids: state.ids.filter((i) => i !== id) })),
        clear: () => set({ ids: [] }),
      }),
      {
        name: "hf-compare",
      }
    ),
    { name: "CompareStore" }
  )
);
