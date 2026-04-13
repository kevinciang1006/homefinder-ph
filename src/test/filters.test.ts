import { describe, it, expect } from "vitest";
import { filterProperties } from "@/lib/utils";
import { PROPERTIES } from "@/data/properties";
import type { PropertyFilters } from "@/types";

const DEFAULT_FILTERS: PropertyFilters = {
  query: "",
  cities: [],
  types: [],
  status: "all",
  priceMin: 0,
  priceMax: 0,
  bedroomsMin: 0,
  developer: null,
};

describe("filterProperties", () => {
  it("returns all properties with default filters", () => {
    const result = filterProperties(PROPERTIES, DEFAULT_FILTERS);
    expect(result).toHaveLength(PROPERTIES.length);
  });

  it("filters by city", () => {
    const result = filterProperties(PROPERTIES, {
      ...DEFAULT_FILTERS,
      cities: ["Makati"],
    });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.city).toBe("Makati"));
  });

  it("filters by type", () => {
    const result = filterProperties(PROPERTIES, {
      ...DEFAULT_FILTERS,
      types: ["condo"],
    });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.type).toBe("condo"));
  });

  it("filters by status for-sale", () => {
    const result = filterProperties(PROPERTIES, {
      ...DEFAULT_FILTERS,
      status: "for-sale",
    });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.status).toBe("for-sale"));
  });

  it("filters by status for-rent", () => {
    const result = filterProperties(PROPERTIES, {
      ...DEFAULT_FILTERS,
      status: "for-rent",
    });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.status).toBe("for-rent"));
  });

  it("filters by priceMin", () => {
    const priceMin = 10_000_000;
    const result = filterProperties(PROPERTIES, {
      ...DEFAULT_FILTERS,
      priceMin,
    });
    result.forEach((p) => expect(p.price).toBeGreaterThanOrEqual(priceMin));
  });

  it("filters by priceMax", () => {
    const priceMax = 10_000_000;
    const result = filterProperties(PROPERTIES, {
      ...DEFAULT_FILTERS,
      priceMax,
    });
    result.forEach((p) => expect(p.price).toBeLessThanOrEqual(priceMax));
  });

  it("filters by bedroomsMin", () => {
    const result = filterProperties(PROPERTIES, {
      ...DEFAULT_FILTERS,
      bedroomsMin: 3,
    });
    result.forEach((p) => expect(p.bedrooms).toBeGreaterThanOrEqual(3));
  });

  it("filters by developer", () => {
    const result = filterProperties(PROPERTIES, {
      ...DEFAULT_FILTERS,
      developer: "Ayala Land",
    });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.developer).toBe("Ayala Land"));
  });

  it("filters by text query matching title", () => {
    const result = filterProperties(PROPERTIES, {
      ...DEFAULT_FILTERS,
      query: "Serendra",
    });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) =>
      expect(
        p.title.toLowerCase().includes("serendra") ||
          p.address.toLowerCase().includes("serendra") ||
          p.developer.toLowerCase().includes("serendra") ||
          p.city.toLowerCase().includes("serendra")
      ).toBe(true)
    );
  });

  it("returns empty array when no match", () => {
    const result = filterProperties(PROPERTIES, {
      ...DEFAULT_FILTERS,
      query: "zzz_no_match_zzz",
    });
    expect(result).toHaveLength(0);
  });

  it("can combine multiple filters", () => {
    const result = filterProperties(PROPERTIES, {
      ...DEFAULT_FILTERS,
      cities: ["Makati"],
      types: ["condo"],
      status: "for-sale",
    });
    result.forEach((p) => {
      expect(p.city).toBe("Makati");
      expect(p.type).toBe("condo");
      expect(p.status).toBe("for-sale");
    });
  });
});
