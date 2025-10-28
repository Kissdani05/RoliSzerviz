import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getBooking, updateBooking } from "../../../lib/bookingStore"; // Updated import to use KV functions
import { emailWrapper } from "../../../lib/emailUtils";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.BOOKING_EMAIL_USER,
    pass: process.env.BOOKING_EMAIL_PASS,
  },
});

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

  // Get booking from Vercel KV
  const foglalas = await getBooking(id);
  if (!foglalas) {
    return new NextResponse(
      "<p style='color:red;'>Foglalás nem található.</p>",
      { headers: { "Content-Type": "text/html" } }
    );
  }

  // Construct the base URL for links
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : process.env.NODE_ENV === 'production' 
    ? 'https://roliszerviz.hu' 
    : "http://localhost:3000";

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

  // Update booking in Vercel KV
  const updatedBooking = await updateBooking(id, {
    status: "proposed",
    newDate: newDate,
    newTime: newTime,
    modificationSent: true,
  });

  if (!updatedBooking) {
    // Handle error if update failed (e.g., booking not found by updateBooking)
    return new NextResponse(
      "<p style='color:red;'>Hiba a foglalás módosítása közben.</p>",
      { headers: { "Content-Type": "text/html" } }
    );
  }

  try {
    const newDateHtml = emailWrapper(`
      <meta charset="UTF-8">
      <h2 style="color: white;">Új időpont javaslat</h2>
      <p style="color: white;">Kedves ${updatedBooking.name}!</p>
      <p style="color: white;">Sajnáljuk, de az eredeti foglalt időpont (${updatedBooking.originalDate} ${updatedBooking.originalTime}) nem elérhető.</p>
      <p style="color: white;">Az alábbi új időpontot javasoljuk Önnek:</p>
      <p style="color: white;"><strong>${updatedBooking.newDate} ${updatedBooking.newTime}</strong></p>
      <div class="button-container" style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
          <a href="${baseUrl}/api/client-response?id=${id}&response=accept" style="background: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; margin-right: 10px;">✅ Elfogadom</a>
          <a href="${baseUrl}/api/client-response?id=${id}&response=reject" style="background: #f44336; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">❌ Elutasítom</a>
      </div>
      <p style="color: white;">Üdvözlettel,<br>RoliSzerviz</p>
    `);
    await transporter.sendMail({
      from: process.env.BOOKING_EMAIL_USER,
      to: updatedBooking.email,
      subject: "Új időpont javaslat",
      html: newDateHtml,
    });

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
