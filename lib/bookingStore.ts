import { kv } from "@vercel/kv";

export interface Booking {
  email: string;
  date: string;
  time: string;
  status:
    | "pending"
    | "accepted"
    | "rejected"
    | "proposed"
    | "client_accepted"
    | "client_rejected";
  name: string;
  phone: string;
  postalCode: string;
  shippingAddress: string;
  differentBilling: boolean;
  billingPostalCode?: string;
  billingAddress?: string;
  services: string[];
  message?: string;
  modificationSent: boolean;
  originalDate: string;
  originalTime: string;
  newDate?: string;
  newTime?: string;
  id: string; // Add id to the booking interface
}

export function generateId(email: string, date: string, time: string): string {
  // Simple unique ID generation for this example. In production, consider UUIDs or database IDs.
  return Buffer.from(`${email}_${date}_${time}_${Date.now()}`).toString(
    "base64url"
  );
}

// Functions to interact with Vercel KV
export async function getBooking(id: string): Promise<Booking | null> {
  try {
    const booking = await kv.get<Booking>(`booking:${id}`);
    return booking;
  } catch (error) {
    console.error("Error fetching booking from KV:", error);
    return null;
  }
}

export async function saveBooking(booking: Booking): Promise<void> {
  try {
    await kv.set(`booking:${booking.id}`, booking);
  } catch (error) {
    console.error("Error saving booking to KV:", error);
    // Handle error appropriately
  }
}

export async function updateBooking(
  id: string,
  updates: Partial<Booking>
): Promise<Booking | null> {
  try {
    const existingBooking = await getBooking(id);
    if (!existingBooking) {
      console.error(`Booking with id ${id} not found for update.`);
      return null;
    }
    const updatedBooking = { ...existingBooking, ...updates };
    await kv.set(`booking:${id}`, updatedBooking);
    return updatedBooking;
  } catch (error) {
    console.error("Error updating booking in KV:", error);
    return null;
  }
}

// If you need to delete bookings (optional)
export async function deleteBooking(id: string): Promise<void> {
  try {
    await kv.del(`booking:${id}`);
  } catch (error) {
    console.error("Error deleting booking from KV:", error);
  }
}
