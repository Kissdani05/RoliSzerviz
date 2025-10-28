// filepath: /Users/ezy/Projects/Others/dani/next-roliszerviz/app/api/confirm/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
// Updated import to use KV functions
import { getBooking, updateBooking, Booking } from "../../../lib/bookingStore";
import { emailWrapper } from "../../../lib/emailUtils";
import { addBookingToCalendar } from '../../../lib/googleCalendar';
import { fromZonedTime, format } from 'date-fns-tz';

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
  console.log("Foglalás ID:", id);
  console.log("Művelet:", action);
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
      // Add to Google Calendar
      try {
        const [from, to] = updatedBooking.originalTime.split(' - ');
        
        // Create date objects in Europe/Budapest timezone
        const startDateTimeLocal = `${updatedBooking.originalDate} ${from.trim()}`;
        const endDateTimeLocal = `${updatedBooking.originalDate} ${to.trim()}`;
        
        // Convert to UTC ISO string format for Google Calendar
        const startDateTime = fromZonedTime(startDateTimeLocal, 'Europe/Budapest').toISOString();
        const endDateTime = fromZonedTime(endDateTimeLocal, 'Europe/Budapest').toISOString();
        
        await addBookingToCalendar({
          summary: `RoliSzerviz foglalás: ${updatedBooking.name}`,
          description: `Szolgáltatások: ${updatedBooking.services.join(', ')}\nÜzenet: ${updatedBooking.message ?? ''}`,
          startDateTime,
          endDateTime,
          location: `${updatedBooking.city}, ${updatedBooking.postalCode} ${updatedBooking.shippingAddress}`.replace(/\s*\d{1,2}:\d{2}(-\d{1,2}:\d{2})?/g, ''), // órát eltávolítja
        });
      } catch (calendarError) {
        console.error('Google Calendar event error:', calendarError);
      }

      const acceptHtml = emailWrapper(
        `<h2 style="color:#fff;">Foglalás visszaigazolás</h2>
        <p style="color:#fff;">Kedves ${updatedBooking.name}!</p>
        <p style="color:#fff;">A(z) ${updatedBooking.originalDate} ${updatedBooking.originalTime} időpontot elfogadtuk.</p>
        <p style="color:#fff;"><strong>Szolgáltatások:</strong></p>
        <ul style="color:#fff;">${updatedBooking.services
          .map((service) => `<li>${service}</li>`)
          .join("")}</ul>
        <p style="color:#fff;"><strong>Szállítási cím:</strong> ${updatedBooking.postalCode} ${
          updatedBooking.shippingAddress
        }</p>
        ${
          updatedBooking.differentBilling
            ? `<p style="color:#fff;"><strong>Számlázási cím:</strong> ${updatedBooking.billingPostalCode} ${updatedBooking.billingAddress}</p>`
            : ""
        }
        <p style="color:#fff;">Köszönjük foglalását!</p>
        <p style="color:#fff;">Üdvözlettel,<br>RoliSzerviz</p>`
      );
      await transporter.sendMail({
        from: process.env.BOOKING_EMAIL_USER,
        to: updatedBooking.email,
        subject: "Foglalás elfogadva",
        html: acceptHtml,
      });
      return new NextResponse(
        `
        <meta charset="UTF-8">
        <p style='color:green;'>Foglalás elfogadva és visszaigazolva az ügyfélnek.</p>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    if (action === "reject") {
      // Update booking in Vercel KV
      updatedBooking = await updateBooking(id, { status: "rejected" });
      if (!updatedBooking) throw new Error("Booking update failed");

      const rejectHtml = emailWrapper(
        `<h2 style="color:#fff;">Foglalás elutasítva</h2>
        <p style="color:#fff;">Kedves ${updatedBooking.name}!</p>
        <p style="color:#fff;">Sajnáljuk, a(z) ${updatedBooking.originalDate} ${updatedBooking.originalTime} időpontot nem tudjuk elfogadni.</p>
        <p style="color:#fff;">Kérjük, látogasson vissza oldalunkra és foglaljon másik időpontot.</p>
        <p style="color:#fff;">Üdvözlettel,<br>RoliSzerviz</p>`
      );
      await transporter.sendMail({
        from: process.env.BOOKING_EMAIL_USER,
        to: updatedBooking.email,
        subject: "Foglalás elutasítva",
        html: rejectHtml,
      });
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
    console.error("Email küldési hiba a /confirm útvonalon:", error);
    return new NextResponse(
      "<p style='color:red;'>Hiba történt az email küldése során</p>",
      { headers: { "Content-Type": "text/html" } }
    );
  }
}
