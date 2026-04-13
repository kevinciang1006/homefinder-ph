import { useQuery } from "@tanstack/react-query";
import type { Property } from "@/types";

async function fetchProperty(id: string): Promise<Property> {
  const res = await fetch(`/api/properties/${id}`);
  if (!res.ok) throw new Error("Property not found");
  return res.json() as Promise<Property>;
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => fetchProperty(id),
    enabled: Boolean(id),
  });
}
