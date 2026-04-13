import { NextResponse } from "next/server";
import { DEVELOPERS } from "@/data/developers";

export function GET() {
  return NextResponse.json(DEVELOPERS);
}
