import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ListingSchema = z.object({
  title: z.string().min(3),
  type: z.enum(["condo", "house-and-lot", "townhouse", "lot"]),
  status: z.enum(["for-sale", "for-rent"]),
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
  address: z.string().min(5),
  lat: z.number(),
  lng: z.number(),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  floorAreaSqm: z.number().positive(),
  price: z.number().positive(),
  description: z.string().min(20),
  amenities: z.array(z.string()),
  photos: z.array(z.string()),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = ListingSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.issues },
      { status: 422 }
    );
  }

  return NextResponse.json({
    id: `listing-${Date.now()}`,
    status: "pending",
  });
}
