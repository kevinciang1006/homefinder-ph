"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property/property-card";
import { useFavoritesStore } from "@/stores/favorites-store";
import { PROPERTIES } from "@/data/properties";

export default function FavoritesPage() {
  const ids = useFavoritesStore((s) => s.ids);
  const favorites = PROPERTIES.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Heart className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">My Favorites</h1>
        {favorites.length > 0 && (
          <span className="rounded-full bg-primary px-2 py-0.5 text-sm font-semibold text-white">
            {favorites.length}
          </span>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-24 text-center">
          <p className="text-5xl">💛</p>
          <h2 className="mt-4 text-lg font-semibold">No favorites yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Click the heart icon on any property to save it here.
          </p>
          <Link href="/properties" className="mt-4">
            <Button>Browse Properties</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
