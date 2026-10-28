import { getPool } from "./db";

export interface Booking {
  id: string;
  email: string;
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
  billingCity?: string;
  services: string[];
  message?: string;
  modificationSent: boolean;
  originalDate: string;
  originalTime: string;
  newDate?: string;
  newTime?: string;
  city: string;
  // Derived: in-shop bookings are stored with an empty shipping address
  inShop?: boolean;
}

export function generateId(email: string, date: string, time: string): string {
  return Buffer.from(`${email}_${date}_${time}_${Date.now()}`).toString(
    "base64url"
  );
}

// Helper to map Booking camelCase to db snake/lowercase
function toDb(booking: Booking | Partial<Booking>) {
  return {
    id: booking.id,
    email: booking.email,
    status: booking.status,
    name: booking.name,
    phone: booking.phone,
    postalcode: booking.postalCode,
    shippingaddress: booking.shippingAddress,
    differentbilling: booking.differentBilling,
    billingpostalcode: booking.billingPostalCode ?? null,
    billingaddress: booking.billingAddress ?? null,
    billingcity: booking.billingCity ?? null,
    services: booking.services ? JSON.stringify(booking.services) : undefined,
    message: booking.message ?? null,
    modificationsent: booking.modificationSent,
    originaldate: booking.originalDate,
    originaltime: booking.originalTime,
    newdate: booking.newDate ?? null,
    newtime: booking.newTime ?? null,
    city: booking.city,
  };
}

// Helper to map db row to Booking
function fromDb(row: Record<string, unknown>): Booking {
  return {
    id: row.id as string,
    email: row.email as string,
    status: row.status as Booking["status"],
    name: row.name as string,
    phone: row.phone as string,
    postalCode: row.postalcode as string,
    shippingAddress: row.shippingaddress as string,
    differentBilling: !!row.differentbilling,
    billingPostalCode: row.billingpostalcode ? String(row.billingpostalcode) : undefined,
    billingAddress: row.billingaddress ? String(row.billingaddress) : undefined,
    billingCity: row.billingcity ? String(row.billingcity) : undefined,
    services: typeof row.services === "string" ? JSON.parse(row.services as string) : (row.services as string[]),
    message: row.message ? String(row.message) : undefined,
    modificationSent: !!row.modificationsent,
    originalDate: row.originaldate as string,
    originalTime: row.originaltime as string,
    newDate: row.newdate ? String(row.newdate) : undefined,
    newTime: row.newtime ? String(row.newtime) : undefined,
    city: row.city as string,
    inShop: !row.shippingaddress,
  };
}

// Functions to interact with Postgres
export async function getBooking(id: string): Promise<Booking | null> {
  try {
    const { rows } = await getPool().query(
      "SELECT * FROM bookings WHERE id = $1",
      [id]
    );
    return rows[0] ? fromDb(rows[0]) : null;
  } catch (error) {
    console.error("Error fetching booking from Postgres:", error);
    return null;
  }
}

export async function saveBooking(booking: Booking): Promise<void> {
  const row = Object.entries(toDb(booking)).filter(([, v]) => v !== undefined);
  const columns = row.map(([col]) => col).join(", ");
  const placeholders = row.map((_, i) => `$${i + 1}`).join(", ");
  try {
    await getPool().query(
      `INSERT INTO bookings (${columns}) VALUES (${placeholders})`,
      row.map(([, v]) => v)
    );
  } catch (error) {
    console.error("Error saving booking to Postgres:", error);
  }
}

export async function updateBooking(
  id: string,
  updates: Partial<Booking>
): Promise<Booking | null> {
  // Only touch columns that were actually passed in (column = lowercased key)
  const keys = Object.keys(updates).map((k) => k.toLowerCase());
  const row = Object.entries(toDb(updates)).filter(
    ([col, v]) => col !== "id" && v !== undefined && keys.includes(col)
  );
  if (row.length > 0) {
    const assignments = row.map(([col], i) => `${col} = $${i + 2}`).join(", ");
    try {
      await getPool().query(
        `UPDATE bookings SET ${assignments} WHERE id = $1`,
        [id, ...row.map(([, v]) => v)]
      );
    } catch (error) {
      console.error("Error updating booking in Postgres:", error);
      return null;
    }
  }
  return getBooking(id);
}

export async function deleteBooking(id: string): Promise<void> {
  try {
    await getPool().query("DELETE FROM bookings WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error deleting booking from Postgres:", error);
  }
}
