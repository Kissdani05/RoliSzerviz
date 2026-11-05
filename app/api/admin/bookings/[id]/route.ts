import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../../lib/adminAuth";
import { getAvailability } from "../../../../../lib/availability";
import {
  acceptBooking,
  BookingActionResult,
  proposeBookingChange,
  rejectBooking,
} from "../../../../../lib/bookingActions";
import { getSlotError } from "../../../../../lib/bookingDates";
import { deleteBooking, getBooking } from "../../../../../lib/bookingStore";

type RouteContext = { params: Promise<{ id: string }> };

const errorResponse = (error: string, status: number) =>
  NextResponse.json({ error }, { status });

export async function POST(request: Request, { params }: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const { action, date, fromHour, toHour } = await request.json();

  const booking = await getBooking(id);
  if (!booking) return errorResponse("Foglalás nem található.", 404);
  if (booking.status !== "pending") {
    return errorResponse("Ez a foglalás már kezelve lett.", 409);
  }

  try {
    let result: BookingActionResult;
    if (action === "accept") {
      result = await acceptBooking(id);
    } else if (action === "reject") {
      result = await rejectBooking(id);
    } else if (action === "propose") {
      const slotError = getSlotError(date, fromHour, toHour, await getAvailability());
      if (slotError) return errorResponse(slotError, 400);
      result = await proposeBookingChange(id, date, `${fromHour}:00 - ${toHour}:00`);
    } else {
      return errorResponse("Érvénytelen művelet.", 400);
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating booking:", error);
    return errorResponse("Nem sikerült módosítani a foglalást.", 500);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  await deleteBooking(id);
  return NextResponse.json({ ok: true });
}
