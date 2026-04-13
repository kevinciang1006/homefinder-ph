import { useQuery, useMutation } from "@tanstack/react-query";
import type { ShoutOut } from "@/types";
import { useShoutoutsStore } from "@/stores/shoutouts-store";

async function fetchShoutouts(): Promise<ShoutOut[]> {
  const res = await fetch("/api/shoutouts");
  if (!res.ok) throw new Error("Failed to fetch shoutouts");
  return res.json() as Promise<ShoutOut[]>;
}

async function postShoutoutApi(
  data: Omit<ShoutOut, "id" | "createdAt">
): Promise<ShoutOut> {
  const res = await fetch("/api/shoutouts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to post shoutout");
  return res.json() as Promise<ShoutOut>;
}

export function useShoutouts() {
  return useQuery({
    queryKey: ["shoutouts"],
    queryFn: fetchShoutouts,
  });
}

export function usePostShoutout() {
  const addToStore = useShoutoutsStore((s) => s.add);

  return useMutation({
    mutationFn: postShoutoutApi,
    onSuccess: (shoutout) => {
      addToStore(shoutout);
    },
  });
}
