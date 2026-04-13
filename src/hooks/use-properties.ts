import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Property, PropertyFilters } from "@/types";
import { buildPropertiesUrl } from "@/lib/api-client";

async function fetchProperties(filters: Partial<PropertyFilters>): Promise<Property[]> {
  const url = buildPropertiesUrl(filters);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json() as Promise<Property[]>;
}

export function useProperties(filters: Partial<PropertyFilters>) {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: () => fetchProperties(filters),
    placeholderData: keepPreviousData,
  });
}
