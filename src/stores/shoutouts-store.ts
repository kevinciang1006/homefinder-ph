"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { ShoutOut } from "@/types";

interface ShoutoutsState {
  shoutouts: ShoutOut[];
  add: (shoutout: ShoutOut) => void;
}

export const useShoutoutsStore = create<ShoutoutsState>()(
  devtools(
    persist(
      (set) => ({
        shoutouts: [],
        add: (shoutout) =>
          set((state) => ({ shoutouts: [shoutout, ...state.shoutouts] })),
      }),
      {
        name: "hf-shoutouts",
      }
    ),
    { name: "ShoutoutsStore" }
  )
);
