// filepath: /Users/ezy/Projects/Others/dani/next-roliszerviz/app/api/confirm/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
// Updated import to use KV functions
import { getBooking, updateBooking, Booking } from "../../../lib/bookingStore";
import { emailWrapper } from "../../../lib/emailUtils";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.BOOKING_EMAIL_USER,
    pass: process.env.BOOKING_EMAIL_PASS,
  },
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const action = searchParams.get("action");

  if (!id || !action) {
    return new NextResponse(
      "<p style='color:red;'>Hiányzó ID vagy művelet.</p>",
      { headers: { "Content-Type": "text/html" } }
    );
  }

  // Get booking from Vercel KV
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

  try {
    let updatedBooking: Booking | null = null;
    if (action === "accept") {
      // Update booking in Vercel KV
      updatedBooking = await updateBooking(id, { status: "accepted" });
      if (!updatedBooking) throw new Error("Booking update failed");

      const acceptHtml = emailWrapper(
        `<h2>Foglalás visszaigazolás</h2>
        <p>Kedves ${updatedBooking.name}!</p>
        <p>A(z) ${updatedBooking.date} ${
          updatedBooking.time
        } időpontot elfogadtuk.</p>
        <p><strong>Szolgáltatások:</strong></p>
        <ul>${updatedBooking.services
          .map((service) => `<li>${service}</li>`)
          .join("")}</ul>
        <p><strong>Szállítási cím:</strong> ${updatedBooking.postalCode} ${
          updatedBooking.shippingAddress
        }</p>
        ${
          updatedBooking.differentBilling
            ? `<p><strong>Számlázási cím:</strong> ${updatedBooking.billingPostalCode} ${updatedBooking.billingAddress}</p>`
            : ""
        }
        <p>Köszönjük foglalását!</p>
        <p>Üdvözlettel,<br>Roli Szervíz</p>`
      );
      await transporter.sendMail({
        from: process.env.BOOKING_EMAIL_USER,
        to: updatedBooking.email,
        subject: "Foglalás elfogadva",
        html: acceptHtml,
      });
      return new NextResponse(
        "<p style='color:green;'>Foglalás elfogadva és visszaigazolva az ügyfélnek.</p>",
        { headers: { "Content-Type": "text/html" } }
      );
    }

    if (action === "reject") {
      // Update booking in Vercel KV
      updatedBooking = await updateBooking(id, { status: "rejected" });
      if (!updatedBooking) throw new Error("Booking update failed");

      const rejectHtml = emailWrapper(
        `<h2>Foglalás elutasítva</h2>
        <p>Kedves ${updatedBooking.name}!</p>
        <p>Sajnáljuk, a(z) ${updatedBooking.date} ${updatedBooking.time} időpontot nem tudjuk elfogadni.</p>
        <p>Kérjük, látogasson vissza oldalunkra és foglaljon másik időpontot.</p>
        <p>Üdvözlettel,<br>Roli Szervíz</p>`
      );
      await transporter.sendMail({
        from: process.env.BOOKING_EMAIL_USER,
        to: updatedBooking.email,
        subject: "Foglalás elutasítva",
        html: rejectHtml,
      });
      return new NextResponse(
        "<p style='color:green;'>Foglalás elutasítva és az ügyfelet értesítettük.</p>",
        { headers: { "Content-Type": "text/html" } }
      );
    }

    return new NextResponse("<p style='color:red;'>Érvénytelen művelet.</p>", {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Email küldési hiba a /confirm útvonalon:", error);
    return new NextResponse(
      "<p style='color:red;'>Hiba történt az email küldése során</p>",
      { headers: { "Content-Type": "text/html" } }
    );
  }
}
