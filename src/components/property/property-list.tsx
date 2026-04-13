import { PropertyCard } from "./property-card";
import type { Property } from "@/types";
import { Button } from "@/components/ui/button";

interface PropertyListProps {
  properties: Property[];
  isLoading?: boolean;
  onClearFilters?: () => void;
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card animate-pulse">
      <div className="h-48 bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-6 w-1/2 rounded bg-muted" />
        <div className="h-3 w-1/3 rounded bg-muted" />
        <div className="flex gap-3">
          <div className="h-4 w-12 rounded bg-muted" />
          <div className="h-4 w-12 rounded bg-muted" />
          <div className="h-4 w-16 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export function PropertyList({ properties, isLoading, onClearFilters }: PropertyListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
        <p className="text-5xl">🏚️</p>
        <h3 className="mt-4 text-lg font-semibold">No properties found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your filters or clearing them to see more results.
        </p>
        {onClearFilters && (
          <Button className="mt-4" onClick={onClearFilters}>
            Clear filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
