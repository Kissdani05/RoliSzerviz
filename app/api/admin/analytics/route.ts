import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/adminAuth";
import { getAdminAnalytics } from "../../../../lib/adminAnalytics";

export const dynamic = "force-dynamic";

const ALLOWED_PERIODS = [3, 6, 12];

export async function GET(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const requested = Number(new URL(request.url).searchParams.get("months"));
  const months = ALLOWED_PERIODS.includes(requested) ? requested : 12;

  try {
    return NextResponse.json(await getAdminAnalytics(months));
  } catch (error) {
    console.error("Error building analytics:", error);
    return NextResponse.json(
      { error: "Nem sikerült betölteni az analitikát." },
      { status: 500 }
    );
  }
}
