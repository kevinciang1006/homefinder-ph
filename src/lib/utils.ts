import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Property, PropertyFilters } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterProperties(
  properties: Property[],
  filters: PropertyFilters
): Property[] {
  return properties.filter((p) => {
    // Text query
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const matches =
        p.title.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.developer.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q);
      if (!matches) return false;
    }

    // Cities
    if (filters.cities.length > 0 && !filters.cities.includes(p.city)) {
      return false;
    }

    // Types
    if (filters.types.length > 0 && !filters.types.includes(p.type)) {
      return false;
    }

    // Status
    if (filters.status !== "all" && p.status !== filters.status) {
      return false;
    }

    // Price
    if (filters.priceMin > 0 && p.price < filters.priceMin) {
      return false;
    }
    if (filters.priceMax > 0 && p.price > filters.priceMax) {
      return false;
    }

    // Bedrooms
    if (filters.bedroomsMin > 0 && p.bedrooms < filters.bedroomsMin) {
      return false;
    }

    // Developer
    if (filters.developer && p.developer !== filters.developer) {
      return false;
    }

    return true;
  });
}
