import { NextRequest, NextResponse } from "next/server";
import { getBooking } from "../../../lib/bookingStore";
import { getAvailability } from "../../../lib/availability";
import { proposeBookingChange } from "../../../lib/bookingActions";
import { getSlotError } from "../../../lib/bookingDates";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const newDate = formData.get("newDate") as string;
  const newFrom = formData.get("newFrom") as string;
  const newTo = formData.get("newTo") as string;

  if (!id || !newDate || !newFrom || !newTo) {
    return new NextResponse(
      "<p style='color:red;'>Hiányzó adatok a módosításhoz.</p>",
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const slotError = getSlotError(newDate, parseInt(newFrom), parseInt(newTo), await getAvailability());
  if (slotError) {
    return new NextResponse(
      `<p style='color:red;'>${slotError}</p>`,
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  // Get booking from database
  const foglalas = await getBooking(id);
  if (!foglalas) {
    return new NextResponse(
      "<p style='color:red;'>Foglalás nem található.</p>",
      { headers: { "Content-Type": "text/html" } }
    );
  }

  if (foglalas.modificationSent) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html><head><title>Hiba</title><style>body{font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:0 auto;text-align:center;background-color:#0e0e0e;color:#fff}h2{color:#f44336}p{margin:20px 0}button{background:#f47b20;color:#0e0e0e;border:none;padding:10px 15px;cursor:pointer;border-radius:4px;font-weight:bold}</style></head>
      <body><h2>Hiba történt</h2><p style='color:red;'>Már küldtél egy módosítási javaslatot ehhez a foglaláshoz.</p><p><button onclick="window.close()">Bezárás</button></p></body></html>
    `,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const newTime = `${newFrom}:00 - ${newTo}:00`;

  try {
    const { booking: updatedBooking, emailSent } = await proposeBookingChange(id, newDate, newTime);
    if (!emailSent) throw new Error("Proposal email failed");

    return new NextResponse(
      `
      
      <!DOCTYPE html>
      <html>
      <meta charset="UTF-8"><head><title>Módosítás elküldve</title><style>body{font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:0 auto;text-align:center;background-color:#0e0e0e;color:#fff}h2{color:#4CAF50}p{margin:20px 0}.success{color:green}button{background:#f47b20;color:#0e0e0e;border:none;padding:10px 15px;cursor:pointer;border-radius:4px;font-weight:bold}</style></head>
      <body><h2>Módosítási javaslat elküldve</h2><p class="success">Az új időpont javaslatot elküldtük az ügyfélnek:</p>
      <p><strong>${updatedBooking.newDate} ${updatedBooking.newTime}</strong></p><p>Eredeti időpont: ${updatedBooking.originalDate} ${updatedBooking.originalTime}</p>
      <p><button onclick="window.close()">Bezárás</button></p></body></html>
    `,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    console.error("Email küldési hiba a /propose-change útvonalon:", error);
    // Optionally revert KV update if email fails, or handle differently
    return new NextResponse(
      `
      
      <!DOCTYPE html>
      <html>
      <meta charset="UTF-8"><head><title>Hiba</title><style>body{font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:0 auto;text-align:center;background-color:#0e0e0e;color:#fff}h2{color:#f44336}p{margin:20px 0}button{background:#f47b20;color:#0e0e0e;border:none;padding:10px 15px;cursor:pointer;border-radius:4px;font-weight:bold}</style></head>
      <body><h2>Hiba történt</h2><p style='color:red;'>Nem sikerült elküldeni az új időpont javaslatot.</p>
      <p><button onclick="window.history.back()">Vissza</button></p></body></html>
    `,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}
