import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { ValuationEstimate } from "@/types";

const ValuationSchema = z.object({
  type: z.enum(["condo", "house-and-lot", "townhouse", "lot"]),
  city: z.enum([
    "Makati",
    "Taguig",
    "Pasig",
    "Mandaluyong",
    "Quezon City",
    "Pasay",
    "Manila",
    "Alabang",
    "Paranaque",
  ]),
  floorAreaSqm: z.number().positive(),
  bedrooms: z.number().int().min(0),
});

// Base price per sqm per city (PHP)
const CITY_BASE_PRICE: Record<string, number> = {
  Makati: 180_000,
  Taguig: 170_000,
  Pasig: 130_000,
  Mandaluyong: 120_000,
  "Quezon City": 110_000,
  Pasay: 125_000,
  Manila: 100_000,
  Alabang: 115_000,
  Paranaque: 95_000,
};

const TYPE_MULTIPLIER: Record<string, number> = {
  condo: 1.0,
  "house-and-lot": 1.1,
  townhouse: 0.95,
  lot: 0.6,
};

const BEDROOM_MULTIPLIER: Record<number, number> = {
  0: 0.85,
  1: 1.0,
  2: 1.08,
  3: 1.15,
  4: 1.2,
  5: 1.25,
};

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = ValuationSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.issues },
      { status: 422 }
    );
  }

  const { type, city, floorAreaSqm, bedrooms } = result.data;

  const basePerSqm = CITY_BASE_PRICE[city] ?? 100_000;
  const typeMultiplier = TYPE_MULTIPLIER[type] ?? 1.0;
  const bedroomMultiplier =
    BEDROOM_MULTIPLIER[Math.min(bedrooms, 5)] ?? 1.0;

  const estimated = Math.round(
    basePerSqm * floorAreaSqm * typeMultiplier * bedroomMultiplier
  );
  const low = Math.round(estimated * 0.92);
  const high = Math.round(estimated * 1.08);

  // Comparable count based on city/type combo
  const comparableCount = Math.floor((basePerSqm / 10_000) * typeMultiplier * 5);

  const estimate: ValuationEstimate = {
    estimated,
    low,
    high,
    comparableCount,
  };

  return NextResponse.json(estimate);
}
