import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getBooking, updateBooking, Booking } from "../../../lib/bookingStore"; // Updated import to use KV functions
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
  const clientAction = searchParams.get("response");

  if (!id || !clientAction) {
    return new NextResponse(
      "<p style='color:red;'>Hiányzó ID vagy válasz.</p>",
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const foglalas = await getBooking(id); // This is the fetched booking
  if (!foglalas) {
    return new NextResponse(
      "<p style='color:red;'>Foglalás nem található.</p>",
      { headers: { "Content-Type": "text/html" } }
    );
  }

  if (foglalas.status !== "proposed") {
    return new NextResponse(
      "<p style='color:orange;'>Ez a módosítási javaslat már nem aktív vagy korábban feldolgozásra került.</p>",
      { headers: { "Content-Type": "text/html" } }
    );
  }

  try {
    let updatedBookingState: Booking | null = null; // Use a different name to avoid confusion with the fetched 'foglalas'
    if (clientAction === "accept") {
      updatedBookingState = await updateBooking(id, {
        status: "client_accepted",
        newDate: foglalas.newDate, // Apply the new date
        newTime: foglalas.newTime, // Apply the new time
      });
      if (!updatedBookingState)
        throw new Error("Booking update failed for client accept");
      // Add to Google Calendar
      try {
        const [from, to] = (updatedBookingState.newTime ?? '').split(' - ');
        
        // Create date objects in Europe/Budapest timezone
        const startDateTimeLocal = `${updatedBookingState.newDate} ${from.trim()}`;
        const endDateTimeLocal = `${updatedBookingState.newDate} ${to.trim()}`;
        
        // Convert to UTC ISO string format for Google Calendar
        const startDateTime = fromZonedTime(startDateTimeLocal, 'Europe/Budapest').toISOString();
        const endDateTime = fromZonedTime(endDateTimeLocal, 'Europe/Budapest').toISOString();
        
        await addBookingToCalendar({
          summary: `RoliSzerviz foglalás: ${updatedBookingState.name}`,
          description: `Szolgáltatások: ${updatedBookingState.services.join(', ')}\nÜzenet: ${updatedBookingState.message ?? ''}`,
          startDateTime,
          endDateTime,
          location: `${updatedBookingState.city}, ${updatedBookingState.postalCode} ${updatedBookingState.shippingAddress}`,
        });
      } catch (calendarError) {
        console.error('Google Calendar event error:', calendarError);
      }

      const adminNotificationHtml = emailWrapper(
        `
        <meta charset="UTF-8">
        <h2>Ügyfél elfogadta az új időpontot</h2>
        <p>${updatedBookingState.name} (${
          updatedBookingState.email
        }) elfogadta a következő időpontot:</p>
        <p><strong>${updatedBookingState.newDate ?? "N/A"} ${
          updatedBookingState.newTime ?? "N/A"
        }</strong></p>
        <p>Eredeti időpont: ${updatedBookingState.originalDate} ${
          updatedBookingState.originalTime
        }</p>
        <p>Szolgáltatások:</p>
        <ul>${updatedBookingState.services
          .map((service) => `<li>${service}</li>`)
          .join("")}</ul>
        <p>Telefonszám: ${updatedBookingState.phone}</p>
      `
      );
      await transporter.sendMail({
        from: process.env.BOOKING_EMAIL_USER,
        to: process.env.BOOKING_EMAIL_USER, // Admin
        subject: "Az ügyfél elfogadta a módosított időpontot",
        html: adminNotificationHtml,
      });

      const clientConfirmationHtml = emailWrapper(
        `
        <meta charset="UTF-8">
        <h2 style="color: white;">Foglalás visszaigazolva</h2>
        <p style="color: white;">Kedves ${updatedBookingState.name}!</p>
        <p style="color: white;">Köszönjük, hogy elfogadta az új időpontot:</p>
        <p style="color: white;"><strong>${updatedBookingState.newDate ?? "N/A"} ${
          updatedBookingState.newTime ?? "N/A"
        }</strong></p>
        <p style="color: white;">Szállítási cím:</p>
        <p style="color: white;"><strong>Cím:</strong> ${
          updatedBookingState.postalCode
        } ${updatedBookingState.shippingAddress}</p>
        ${
          updatedBookingState.differentBilling
            ? `<p style="color: white;"><strong>Számlázási cím:</strong> ${updatedBookingState.billingPostalCode} ${updatedBookingState.billingAddress}</p>`
            : ""
        }
        <p style="color: white;">Üdvözlettel,<br>RoliSzerviz</p>
      `
      );
      await transporter.sendMail({
        from: process.env.BOOKING_EMAIL_USER,
        to: updatedBookingState.email,
        subject: "Foglalás visszaigazolva",
        html: clientConfirmationHtml,
      });

      return new NextResponse(
        `
        <!DOCTYPE html>
        <html><meta charset="UTF-8"><head><title>Elfogadva</title><style>body{font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:0 auto;text-align:center;background-color:#0e0e0e;color:#fff}h2{color:#4CAF50}p{margin:20px 0}button{background:#f47b20;color:#0e0e0e;border:none;padding:10px 15px;cursor:pointer;border-radius:4px;font-weight:bold}</style></head>
        <body><h2>Elfogadva</h2><p>Köszönjük, hogy elfogadta az új időpontot.</p>
        <p><strong>${updatedBookingState.newDate ?? "N/A"} ${updatedBookingState.newTime ?? "N/A"}</strong></p><p>Egy visszaigazoló emailt is küldtünk Önnek.</p>
        <p><button onclick="window.close()">Bezárás</button></p></body></html>
      `,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    if (clientAction === "reject") {
      updatedBookingState = await updateBooking(id, {
        status: "client_rejected",
      });
      if (!updatedBookingState)
        throw new Error("Booking update failed for client reject");

      const adminNotificationHtml = emailWrapper(
        `
        <meta charset="UTF-8">
        <h2>Ügyfél elutasította az új időpontot</h2>
        <p>${updatedBookingState.name} (${
          updatedBookingState.email
        }) elutasította az új időpontot:</p>
        <p>Javasolt új időpont: <strong>${
          updatedBookingState.newDate ?? "N/A"
        } ${updatedBookingState.newTime ?? "N/A"}</strong></p>
        <p>Eredeti időpont: ${updatedBookingState.originalDate} ${
          updatedBookingState.originalTime
        }</p>
        <p>Kérjük, lépjen kapcsolatba az ügyféllel: ${
          updatedBookingState.phone
        }</p>
      `
      );
      await transporter.sendMail({
        from: process.env.BOOKING_EMAIL_USER,
        to: process.env.BOOKING_EMAIL_USER, // Admin
        subject: "Az ügyfél elutasította a módosított időpontot",
        html: adminNotificationHtml,
      });
      const clientNotificationHtml = emailWrapper(
        `
        <meta charset="UTF-8">
        <h2 style="color: white;">Foglalás visszautasítva</h2>
        <p style="color: white;">Kedves ${updatedBookingState.name}!</p>
        <p style="color: white;">Értesítését megkaptuk, hogy nem fogadja el a javasolt új időpontot.</p>
        <p style="color: white;">Kérjük, látogasson vissza oldalunkra és foglaljon másik időpontot, vagy vegye fel velünk a kapcsolatot.</p>
        <p style="color: white;">Üdvözlettel,<br>RoliSzerviz</p>
      `
      );
      await transporter.sendMail({
        from: process.env.BOOKING_EMAIL_USER,
        to: updatedBookingState.email,
        subject: "Időpont módosítási javaslat visszautasítva",
        html: clientNotificationHtml,
      });

      return new NextResponse(
        `
        <!DOCTYPE html>
        <html><meta charset="UTF-8"><head><title>Elutasítva</title><style>body{font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:0 auto;text-align:center;background-color:#0e0e0e;color:#fff}h2{color:#f44336}p{margin:20px 0}button{background:#f47b20;color:#0e0e0e;border:none;padding:10px 15px;cursor:pointer;border-radius:4px;font-weight:bold}</style></head>
        <body><h2>Elutasítva</h2><p>Értesítését megkaptuk, hogy nem fogadja el a javasolt új időpontot.</p>
        <p>Kérjük, látogasson vissza oldalunkra és foglaljon másik időpontot, vagy vegye fel velünk a kapcsolatot.</p>
        <p><button onclick="window.close()">Bezárás</button></p></body></html>
      `,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    return new NextResponse("<p style='color:red;'>Érvénytelen válasz.</p>", {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Email küldési hiba a /client-response útvonalon:", error);
    return new NextResponse(
      "<p style='color:red;'>Hiba történt a válasz feldolgozása során.</p>",
      { headers: { "Content-Type": "text/html" } }
    );
  }
}
