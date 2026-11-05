import { NextResponse } from "next/server";
import { getAvailability } from "../../../lib/availability";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getAvailability());
}
