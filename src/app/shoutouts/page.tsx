"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShoutOutCard } from "@/components/shoutout/shoutout-card";
import { useShoutouts } from "@/hooks/use-shoutouts";
import { useShoutoutsStore } from "@/stores/shoutouts-store";
import { SHOUTOUTS } from "@/data/shoutouts";
import type { ShoutOut, PHCity } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PH_CITIES } from "@/lib/constants";

export default function ShoutoutsPage() {
  const { data: apiShoutouts } = useShoutouts();
  const localShoutouts = useShoutoutsStore((s) => s.shoutouts);
  const [cityFilter, setCityFilter] = useState("all");

  // Merge: local + API (fall back to seed if API fails) + deduplicate
  const baseShoutouts: ShoutOut[] = apiShoutouts ?? SHOUTOUTS;
  const allShoutouts: ShoutOut[] = [
    ...localShoutouts,
    ...baseShoutouts.filter((s) => !localShoutouts.find((l) => l.id === s.id)),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filtered =
    cityFilter === "all"
      ? allShoutouts
      : allShoutouts.filter((s) => s.preferredCities.includes(cityFilter as PHCity));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Buyer ShoutOuts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Buyers posting their wish lists — match them with your property.
          </p>
        </div>
        <Link href="/shoutouts/new">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Post a ShoutOut
          </Button>
        </Link>
      </div>

      {/* Filter bar */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="w-48">
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {PH_CITIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="flex items-center text-sm text-muted-foreground">
          {filtered.length} shoutout{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
          <p className="text-4xl">📣</p>
          <h3 className="mt-4 font-semibold">No ShoutOuts yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">Be the first to post one!</p>
          <Link href="/shoutouts/new" className="mt-4">
            <Button>Post a ShoutOut</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <ShoutOutCard key={s.id} shoutout={s} />
          ))}
        </div>
      )}
    </div>
  );
}
