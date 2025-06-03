import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateId, saveBooking, Booking } from "../../../lib/bookingStore";
import { emailWrapper } from "../../../lib/emailUtils";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.BOOKING_EMAIL_USER,
    pass: process.env.BOOKING_EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  const {
    name,
    email,
    phone,
    postalCode,
    shippingAddress,
    differentBilling,
    billingPostalCode,
    billingAddress,
    services,
    date,
    time,
    message,
  } = await request.json();

  // Generate unique ID for the booking
  const id = generateId(email, date, time);

  const newBooking: Booking = {
    id,
    name,
    email,
    phone,
    postalCode,
    shippingAddress,
    differentBilling,
    billingPostalCode,
    billingAddress,
    services,
    date,
    time,
    message,
    status: "pending",
    modificationSent: false,
    originalDate: date,
    originalTime: time,
  };

  // Save booking to Vercel KV
  await saveBooking(newBooking);

  // Construct the base URL for links
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";

  const adminHtml = emailWrapper(`
    <h2>Új időpont foglalás</h2>
    <p><strong>Név:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Telefonszám:</strong> ${phone}</p>
    <p><strong>Szolgáltatások:</strong></p>
    <ul>${services
      .map((service: string) => `<li>${service}</li>`)
      .join("")}</ul>
    <p><strong>Időpont:</strong> ${date} ${time}</p>
    ${message ? `<p><strong>Üzenet:</strong> ${message}</p>` : ""}
    <div class="button-container" style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
      
      <a href="${baseUrl}/api/confirm?id=${id}&action=accept">✅ Elfogadom</a>
      <a href="${baseUrl}/api/confirm?id=${id}&action=reject">❌ Elutasítom</a>
      <a href="${baseUrl}/api/modify?id=${id}" style="background: #2196F3; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">🔁 Módosítást ajánlok</a>
    </div>
  `);

  const adminMailOptions = {
    from: process.env.BOOKING_EMAIL_USER,
    to: process.env.BOOKING_EMAIL_USER, // Send to admin
    subject: "Új időpont foglalás",
    html: adminHtml,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    return NextResponse.json({ message: "Foglalás elküldve." });
  } catch (error) {
    console.error("Email küldési hiba:", error);
    return NextResponse.json(
      { error: "Hiba történt az email küldése során" },
      { status: 500 }
    );
  }
}