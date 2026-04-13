"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFiltersStore } from "@/stores/filters-store";
import { useDevelopers } from "@/hooks/use-developers";
import { PH_CITIES, PROPERTY_TYPES } from "@/lib/constants";
import { formatPHP } from "@/lib/format";
import type { PHCity, PropertyType, ListingStatus } from "@/types";

const MAX_PRICE = 80_000_000;

export function PropertyFilters() {
  const { filters, setCities, setTypes, setStatus, setPriceRange, setBedroomsMin, setDeveloper, reset } =
    useFiltersStore();
  const { data: developers } = useDevelopers();

  const toggleCity = (city: PHCity) => {
    if (filters.cities.includes(city)) {
      setCities(filters.cities.filter((c) => c !== city));
    } else {
      setCities([...filters.cities, city]);
    }
  };

  const toggleType = (type: PropertyType) => {
    if (filters.types.includes(type)) {
      setTypes(filters.types.filter((t) => t !== type));
    } else {
      setTypes([...filters.types, type]);
    }
  };

  return (
    <div className="space-y-6 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
          Clear all
        </Button>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Listing Type
        </Label>
        <div className="flex gap-2">
          {(["all", "for-sale", "for-rent"] as const).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={filters.status === s ? "default" : "outline"}
              onClick={() => setStatus(s as ListingStatus | "all")}
              className="flex-1 text-xs"
            >
              {s === "all" ? "All" : s === "for-sale" ? "For Sale" : "For Rent"}
            </Button>
          ))}
        </div>
      </div>

      {/* Cities */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          City
        </Label>
        <div className="space-y-2">
          {PH_CITIES.map((city) => (
            <div key={city} className="flex items-center gap-2">
              <Checkbox
                id={`city-${city}`}
                checked={filters.cities.includes(city)}
                onCheckedChange={() => toggleCity(city)}
              />
              <label
                htmlFor={`city-${city}`}
                className="cursor-pointer text-sm"
              >
                {city}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Property Type
        </Label>
        <div className="space-y-2">
          {PROPERTY_TYPES.map(({ value, label }) => (
            <div key={value} className="flex items-center gap-2">
              <Checkbox
                id={`type-${value}`}
                checked={filters.types.includes(value)}
                onCheckedChange={() => toggleType(value)}
              />
              <label htmlFor={`type-${value}`} className="cursor-pointer text-sm">
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Price Range
        </Label>
        <Slider
          min={0}
          max={MAX_PRICE}
          step={500_000}
          value={[
            filters.priceMin || 0,
            filters.priceMax || MAX_PRICE,
          ]}
          onValueChange={([min, max]) => {
            if (min !== undefined && max !== undefined) {
              setPriceRange(min, max === MAX_PRICE ? 0 : max);
            }
          }}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{filters.priceMin ? formatPHP(filters.priceMin) : "Any"}</span>
          <span>
            {filters.priceMax && filters.priceMax < MAX_PRICE
              ? formatPHP(filters.priceMax)
              : "Any"}
          </span>
        </div>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Min Bedrooms
        </Label>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((n) => (
            <Button
              key={n}
              size="sm"
              variant={filters.bedroomsMin === n ? "default" : "outline"}
              onClick={() => setBedroomsMin(n)}
              className="flex-1 text-xs"
            >
              {n === 0 ? "Any" : `${n}+`}
            </Button>
          ))}
        </div>
      </div>

      {/* Developer */}
      {developers && developers.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Developer
          </Label>
          <Select
            value={filters.developer ?? "all"}
            onValueChange={(v) => setDeveloper(v === "all" ? null : v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any developer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any developer</SelectItem>
              {developers.map((d) => (
                <SelectItem key={d.id} value={d.name}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
