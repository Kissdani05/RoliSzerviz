import nodemailer from "nodemailer";
import { fromZonedTime } from "date-fns-tz";
import { Booking, updateBooking } from "./bookingStore";
import { emailWrapper } from "./emailUtils";
import { addBookingToCalendar } from "./googleCalendar";

const transporter = nodemailer.createTransport({
  // Port 587 (STARTTLS): Hetzner blocks outbound 465
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
  auth: {
    user: process.env.BOOKING_EMAIL_USER,
    pass: process.env.BOOKING_EMAIL_PASS,
  },
});

export interface BookingActionResult {
  booking: Booking;
  emailSent: boolean;
}

async function sendClientEmail(to: string, subject: string, html: string): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: `"ROLISZERVIZ" <${process.env.BOOKING_EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Email küldési hiba:", error);
    return false;
  }
}

async function addToCalendar(booking: Booking): Promise<void> {
  try {
    const [from, to] = booking.originalTime.split(" - ");
    const toUtc = (time: string) =>
      fromZonedTime(
        `${booking.originalDate}T${time.trim().padStart(5, "0")}:00`,
        "Europe/Budapest"
      ).toISOString();

    await addBookingToCalendar({
      summary: `RoliSzerviz foglalás: ${booking.name}`,
      description: `Szolgáltatások: ${booking.services.join(", ")}\nÜzenet: ${booking.message ?? ""}`,
      startDateTime: toUtc(from),
      endDateTime: toUtc(to),
      location: booking.inShop
        ? "Üzletben (az ügyfél hozza a rollert)"
        : `${booking.city}, ${booking.postalCode} ${booking.shippingAddress}`.replace(/\s*\d{1,2}:\d{2}(-\d{1,2}:\d{2})?/g, ""), // órát eltávolítja
    });
  } catch (calendarError) {
    console.error("Google Calendar event error:", calendarError);
  }
}

export async function acceptBooking(id: string): Promise<BookingActionResult> {
  const booking = await updateBooking(id, { status: "accepted" });
  if (!booking) throw new Error("Booking update failed");

  await addToCalendar(booking);

  const emailSent = await sendClientEmail(
    booking.email,
    "ROLISZERVIZ – Foglalás elfogadva",
    emailWrapper(
      `<h2 style="color:#fff;">Foglalás visszaigazolás</h2>
      <p style="color:#fff;">Kedves ${booking.name}!</p>
      <p style="color:#fff;">A(z) ${booking.originalDate} ${booking.originalTime} időpontot elfogadtuk.</p>
      <p style="color:#fff;"><strong>Szolgáltatások:</strong></p>
      <ul style="color:#fff;">${booking.services
        .map((service) => `<li>${service}</li>`)
        .join("")}</ul>
      ${
        booking.inShop
          ? `<p style="color:#fff;">Kérjük, a megadott időpontban hozza be a rollert az üzletünkbe.</p>`
          : `<p style="color:#fff;"><strong>Szállítási cím:</strong> ${booking.postalCode} ${booking.shippingAddress}</p>`
      }
      ${
        !booking.inShop && booking.differentBilling
          ? `<p style="color:#fff;"><strong>Számlázási cím:</strong> ${booking.billingPostalCode} ${booking.billingAddress}</p>`
          : ""
      }
      <p style="color:#fff;">Köszönjük foglalását!</p>
      <p style="color:#fff;">Üdvözlettel,<br>RoliSzerviz</p>`
    )
  );
  return { booking, emailSent };
}

export async function rejectBooking(id: string): Promise<BookingActionResult> {
  const booking = await updateBooking(id, { status: "rejected" });
  if (!booking) throw new Error("Booking update failed");

  const emailSent = await sendClientEmail(
    booking.email,
    "ROLISZERVIZ – Foglalás elutasítva",
    emailWrapper(
      `<h2 style="color:#fff;">Foglalás elutasítva</h2>
      <p style="color:#fff;">Kedves ${booking.name}!</p>
      <p style="color:#fff;">Sajnáljuk, a(z) ${booking.originalDate} ${booking.originalTime} időpontot nem tudjuk elfogadni.</p>
      <p style="color:#fff;">Kérjük, látogasson vissza oldalunkra és foglaljon másik időpontot.</p>
      <p style="color:#fff;">Üdvözlettel,<br>RoliSzerviz</p>`
    )
  );
  return { booking, emailSent };
}

export async function proposeBookingChange(
  id: string,
  newDate: string,
  newTime: string
): Promise<BookingActionResult> {
  const booking = await updateBooking(id, {
    status: "proposed",
    newDate,
    newTime,
    modificationSent: true,
  });
  if (!booking) throw new Error("Booking update failed");

  const baseUrl = process.env.SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://roliszerviz.hu"
      : "http://localhost:3000");

  const emailSent = await sendClientEmail(
    booking.email,
    "ROLISZERVIZ – Új időpont javaslat",
    emailWrapper(`
      <meta charset="UTF-8">
      <h2 style="color: white;">Új időpont javaslat</h2>
      <p style="color: white;">Kedves ${booking.name}!</p>
      <p style="color: white;">Sajnáljuk, de az eredeti foglalt időpont (${booking.originalDate} ${booking.originalTime}) nem elérhető.</p>
      <p style="color: white;">Az alábbi új időpontot javasoljuk Önnek:</p>
      <p style="color: white;"><strong>${booking.newDate} ${booking.newTime}</strong></p>
      <div class="button-container" style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
          <a href="${baseUrl}/api/client-response?id=${id}&response=accept" style="background: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; margin-right: 10px;">✅ Elfogadom</a>
          <a href="${baseUrl}/api/client-response?id=${id}&response=reject" style="background: #f44336; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">❌ Elutasítom</a>
      </div>
      <p style="color: white;">Üdvözlettel,<br>RoliSzerviz</p>
    `)
  );
  return { booking, emailSent };
}
