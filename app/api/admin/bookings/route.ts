import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/adminAuth";
import { listBookings } from "../../../../lib/bookingStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    return NextResponse.json({ bookings: await listBookings() });
  } catch (error) {
    console.error("Error listing bookings:", error);
    return NextResponse.json(
      { error: "Nem sikerült betölteni a foglalásokat." },
      { status: 500 }
    );
  }
}
