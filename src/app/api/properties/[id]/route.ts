import { NextRequest, NextResponse } from "next/server";
import { PROPERTIES } from "@/data/properties";

export function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  return params.then(({ id }) => {
    const property = PROPERTIES.find((p) => p.id === id);
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json(property);
  });
}
