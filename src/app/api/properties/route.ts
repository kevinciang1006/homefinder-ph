import { NextRequest, NextResponse } from "next/server";
import { PROPERTIES } from "@/data/properties";
import type { PHCity, PropertyType, ListingStatus } from "@/types";

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const query = searchParams.get("query") ?? "";
  const cities = searchParams.getAll("city") as PHCity[];
  const types = searchParams.getAll("type") as PropertyType[];
  const status = (searchParams.get("status") ?? "all") as ListingStatus | "all";
  const priceMin = Number(searchParams.get("priceMin") ?? 0);
  const priceMax = Number(searchParams.get("priceMax") ?? 0);
  const bedroomsMin = Number(searchParams.get("bedroomsMin") ?? 0);
  const developer = searchParams.get("developer");

  let results = PROPERTIES;

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.developer.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
    );
  }

  if (cities.length > 0) {
    results = results.filter((p) => cities.includes(p.city));
  }

  if (types.length > 0) {
    results = results.filter((p) => types.includes(p.type));
  }

  if (status !== "all") {
    results = results.filter((p) => p.status === status);
  }

  if (priceMin > 0) {
    results = results.filter((p) => p.price >= priceMin);
  }

  if (priceMax > 0) {
    results = results.filter((p) => p.price <= priceMax);
  }

  if (bedroomsMin > 0) {
    results = results.filter((p) => p.bedrooms >= bedroomsMin);
  }

  if (developer) {
    results = results.filter((p) => p.developer === developer);
  }

  return NextResponse.json(results);
}
