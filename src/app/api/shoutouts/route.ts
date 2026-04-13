import { NextRequest, NextResponse } from "next/server";
import { SHOUTOUTS } from "@/data/shoutouts";
import { z } from "zod";

const ShoutOutSchema = z.object({
  buyerName: z.string().min(1),
  budget: z.object({
    min: z.number().positive(),
    max: z.number().positive(),
  }),
  preferredCities: z.array(z.string()).min(1),
  preferredType: z.enum(["condo", "house-and-lot", "townhouse", "lot"]),
  bedroomsMin: z.number().int().min(0),
  description: z.string().min(10),
});

export function GET() {
  const sorted = [...SHOUTOUTS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(sorted);
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = ShoutOutSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.issues },
      { status: 422 }
    );
  }

  const shoutout = {
    id: `shout-${Date.now()}`,
    ...result.data,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(shoutout, { status: 201 });
}
