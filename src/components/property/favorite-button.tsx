"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavoritesStore } from "@/stores/favorites-store";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  propertyId: string;
  className?: string;
  size?: "sm" | "default" | "icon";
}

export function FavoriteButton({ propertyId, className, size = "icon" }: FavoriteButtonProps) {
  const { toggle, isFavorite } = useFavoritesStore();
  const fav = isFavorite(propertyId);

  return (
    <Button
      variant="ghost"
      size={size}
      className={cn("rounded-full", fav && "text-primary", className)}
      onClick={(e) => {
        e.preventDefault();
        toggle(propertyId);
      }}
      aria-label={fav ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={cn("h-5 w-5", fav && "fill-primary")} />
    </Button>
  );
}
