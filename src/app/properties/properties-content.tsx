"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, LayoutGrid, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PropertyFilters } from "@/components/property/property-filters";
import { PropertyList } from "@/components/property/property-list";
import { PropertySearch } from "@/components/property/property-search";
import { useProperties } from "@/hooks/use-properties";
import { useFiltersStore } from "@/stores/filters-store";
import { useDebounce } from "@/hooks/use-debounce";
import type { PHCity, PropertyType } from "@/types";

const PropertyMap = dynamic(
  () => import("@/components/property/property-map").then((m) => m.PropertyMap),
  { ssr: false, loading: () => <div className="h-[600px] rounded-lg bg-muted animate-pulse" /> }
);

export function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { filters, setFilters, setQuery, reset } = useFiltersStore();
  const [searchInput, setSearchInput] = useState(filters.query);
  const debouncedQuery = useDebounce(searchInput, 300);

  // Sync URL params to store on mount
  useEffect(() => {
    const q = searchParams.get("query");
    const city = searchParams.get("city") as PHCity | null;
    const type = searchParams.get("type") as PropertyType | null;
    if (q || city || type) {
      setFilters({
        query: q ?? "",
        cities: city ? [city] : [],
        types: type ? [type] : [],
      });
      if (q) setSearchInput(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync debounced query to store
  useEffect(() => {
    setQuery(debouncedQuery);
  }, [debouncedQuery, setQuery]);

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.query) params.set("query", filters.query);
    filters.cities.forEach((c) => params.append("city", c));
    filters.types.forEach((t) => params.append("type", t));
    if (filters.status !== "all") params.set("status", filters.status);
    const qs = params.toString();
    router.replace(`/properties${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [filters, router]);

  const { data: properties, isLoading } = useProperties(filters);

  const count = properties?.length ?? 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Top bar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 max-w-md">
          <PropertySearch
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Search properties…"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {isLoading ? "Loading…" : `${count} result${count !== 1 ? "s" : ""}`}
          </span>
          {/* Mobile filter sheet */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Properties</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <PropertyFilters />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 md:block">
          <PropertyFilters />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <Tabs defaultValue="list">
            <div className="mb-4 flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="list" className="gap-1">
                  <LayoutGrid className="h-4 w-4" />
                  List
                </TabsTrigger>
                <TabsTrigger value="map" className="gap-1">
                  <Map className="h-4 w-4" />
                  Map
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="list">
              <PropertyList
                properties={properties ?? []}
                isLoading={isLoading}
                onClearFilters={reset}
              />
            </TabsContent>

            <TabsContent value="map">
              <PropertyMap properties={properties ?? []} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
