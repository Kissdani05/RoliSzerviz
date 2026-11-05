// filepath: /Users/ezy/Projects/Others/dani/next-roliszerviz/app/api/confirm/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getBooking } from "../../../lib/bookingStore";
import { acceptBooking, rejectBooking } from "../../../lib/bookingActions";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const action = searchParams.get("action");
  console.log("Foglalás ID:", id);
  console.log("Művelet:", action);
  if (!id || !action) {
    return new NextResponse(
      "<p style='color:red;'>Hiányzó ID vagy művelet.</p>",
      { headers: { "Content-Type": "text/html" } }
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

  if (foglalas.status !== "pending") {
    return new NextResponse(
      `<p style='color:orange;'>A foglalás már kezelve lett (${foglalas.status}).</p>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const emailErrorResponse = new NextResponse(
    "<p style='color:red;'>Hiba történt az email küldése során</p>",
    { headers: { "Content-Type": "text/html" } }
  );

  try {
    if (action === "accept") {
      const { emailSent } = await acceptBooking(id);
      if (!emailSent) return emailErrorResponse;
      return new NextResponse(
        `
        <meta charset="UTF-8">
        <p style='color:green;'>Foglalás elfogadva és visszaigazolva az ügyfélnek.</p>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    if (action === "reject") {
      const { emailSent } = await rejectBooking(id);
      if (!emailSent) return emailErrorResponse;
      return new NextResponse(
        `<meta charset="UTF-8">
        <p style='color:red;'>Foglalás elutasítva és az ügyfelet értesítettük.</p>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    return new NextResponse("<p style='color:red;'>Érvénytelen művelet.</p>", {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Foglalás módosítási hiba a /confirm útvonalon:", error);
    return emailErrorResponse;
  }
}
