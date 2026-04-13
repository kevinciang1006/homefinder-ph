import { useQuery } from "@tanstack/react-query";
import type { Developer } from "@/types";

async function fetchDevelopers(): Promise<Developer[]> {
  const res = await fetch("/api/developers");
  if (!res.ok) throw new Error("Failed to fetch developers");
  return res.json() as Promise<Developer[]>;
}

export function useDevelopers() {
  return useQuery({
    queryKey: ["developers"],
    queryFn: fetchDevelopers,
    staleTime: 5 * 60 * 1000,
  });
}
