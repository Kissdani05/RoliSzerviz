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
  try {
    const {
      name,
      email,
      phone,
      city,
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
      city,
      postalCode,
      shippingAddress,
      differentBilling,
      billingPostalCode,
      billingAddress,
      services,
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
      <p><strong>Város:</strong> ${city}</p>
      <p><strong>Irányítószám:</strong> ${postalCode}</p>
      <p><strong>Szolgáltatások:</strong></p>
      <ul>${services
        .map((service: string) => `<li>${service}</li>`)
        .join("")}</ul>
      <p><strong>Időpont:</strong> ${date} ${time}</p>
      ${message ? `<p><strong>Üzenet:</strong> ${message}</p>` : ""}
      <div class="button-container" style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
        
        <a href="${baseUrl}/api/confirm?id=${id}" style="background: green; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;"&action=accept">✅ Elfogadom</a>
        <a href="${baseUrl}/api/confirm?id=${id}" style="background: red; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;"&action=reject">❌ Elutasítom</a>
        <a href="${baseUrl}/api/modify?id=${id}" style="background: #2196F3; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">🔁 Módosítást ajánlok</a>
      </div>
    `);

    const adminMailOptions = {
      from: process.env.BOOKING_EMAIL_USER,
      to: process.env.BOOKING_EMAIL_USER, // Send to admin
      subject: "Új időpont foglalás",
      html: adminHtml,
    };

    await transporter.sendMail(adminMailOptions);
    return NextResponse.json({ message: "Foglalás elküldve." });
  } catch (error) {
    // Enhanced error logging for debugging
    console.error("Email küldési hiba:", error);
    if (error && typeof error === 'object') {
      console.error("Error name:", (error as Error).name);
      console.error("Error message:", (error as Error).message);
      console.error("Error stack:", (error as Error).stack);
    }
    console.error("BOOKING_EMAIL_USER:", process.env.BOOKING_EMAIL_USER);
    console.error("BOOKING_EMAIL_PASS is set:", !!process.env.BOOKING_EMAIL_PASS);
    return NextResponse.json(
      { error: "Hiba történt az email küldése során" },
      { status: 500 }
    );
  }
}