"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { PropertyFilters, PHCity, PropertyType, ListingStatus } from "@/types";

const DEFAULT_FILTERS: PropertyFilters = {
  query: "",
  cities: [],
  types: [],
  status: "all",
  priceMin: 0,
  priceMax: 0,
  bedroomsMin: 0,
  developer: null,
};

interface FiltersState {
  filters: PropertyFilters;
  setQuery: (query: string) => void;
  setCities: (cities: PHCity[]) => void;
  setTypes: (types: PropertyType[]) => void;
  setStatus: (status: ListingStatus | "all") => void;
  setPriceRange: (min: number, max: number) => void;
  setBedroomsMin: (bedrooms: number) => void;
  setDeveloper: (developer: string | null) => void;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  reset: () => void;
}

export const useFiltersStore = create<FiltersState>()(
  devtools(
    (set) => ({
      filters: DEFAULT_FILTERS,
      setQuery: (query) =>
        set((state) => ({ filters: { ...state.filters, query } })),
      setCities: (cities) =>
        set((state) => ({ filters: { ...state.filters, cities } })),
      setTypes: (types) =>
        set((state) => ({ filters: { ...state.filters, types } })),
      setStatus: (status) =>
        set((state) => ({ filters: { ...state.filters, status } })),
      setPriceRange: (priceMin, priceMax) =>
        set((state) => ({ filters: { ...state.filters, priceMin, priceMax } })),
      setBedroomsMin: (bedroomsMin) =>
        set((state) => ({ filters: { ...state.filters, bedroomsMin } })),
      setDeveloper: (developer) =>
        set((state) => ({ filters: { ...state.filters, developer } })),
      setFilters: (partial) =>
        set((state) => ({ filters: { ...state.filters, ...partial } })),
      reset: () => set({ filters: DEFAULT_FILTERS }),
    }),
    { name: "FiltersStore" }
  )
);
