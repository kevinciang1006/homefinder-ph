import type { PropertyFilters } from "@/types";

export function buildPropertiesUrl(filters: Partial<PropertyFilters>): string {
  const params = new URLSearchParams();

  if (filters.query) params.set("query", filters.query);
  if (filters.cities && filters.cities.length > 0) {
    filters.cities.forEach((c) => params.append("city", c));
  }
  if (filters.types && filters.types.length > 0) {
    filters.types.forEach((t) => params.append("type", t));
  }
  if (filters.status && filters.status !== "all") {
    params.set("status", filters.status);
  }
  if (filters.priceMin && filters.priceMin > 0) {
    params.set("priceMin", String(filters.priceMin));
  }
  if (filters.priceMax && filters.priceMax > 0) {
    params.set("priceMax", String(filters.priceMax));
  }
  if (filters.bedroomsMin && filters.bedroomsMin > 0) {
    params.set("bedroomsMin", String(filters.bedroomsMin));
  }
  if (filters.developer) {
    params.set("developer", filters.developer);
  }

  const query = params.toString();
  return `/api/properties${query ? `?${query}` : ""}`;
}
