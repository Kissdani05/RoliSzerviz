import { getSupabaseClient } from "./supabaseClient";

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
  services: string[];
  message?: string;
  modificationSent: boolean;
  originalDate: string;
  originalTime: string;
  newDate?: string;
  newTime?: string;
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
    services: booking.services ? JSON.stringify(booking.services) : undefined,
    message: booking.message ?? null,
    modificationsent: booking.modificationSent,
    originaldate: booking.originalDate,
    originaltime: booking.originalTime,
    newdate: booking.newDate ?? null,
    newtime: booking.newTime ?? null,
  };
}

// Helper to map db row to Booking
function fromDb(row: Record<string, unknown>): Booking {
  return {
    id: row.id,
    email: row.email,
    status: row.status,
    name: row.name,
    phone: row.phone,
    postalCode: row.postalcode,
    shippingAddress: row.shippingaddress,
    differentBilling: !!row.differentbilling,
    billingPostalCode: row.billingpostalcode ?? undefined,
    billingAddress: row.billingaddress ?? undefined,
    services: typeof row.services === "string" ? JSON.parse(row.services) : row.services,
    message: row.message ?? undefined,
    modificationSent: !!row.modificationsent,
    originalDate: row.originaldate,
    originalTime: row.originaltime,
    newDate: row.newdate ?? undefined,
    newTime: row.newtime ?? undefined,
  };
}

// Functions to interact with Supabase
export async function getBooking(id: string): Promise<Booking | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) {
    console.error("Error fetching booking from Supabase:", error);
    return null;
  }
  return fromDb(data);
}

export async function saveBooking(booking: Booking): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("bookings").insert([
    toDb(booking),
  ]);
  if (error) {
    console.error("Error saving booking to Supabase:", error);
  }
}

export async function updateBooking(
  id: string,
  updates: Partial<Booking>
): Promise<Booking | null> {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from("bookings")
    .update(toDb(updates))
    .eq("id", id);
  if (error) {
    console.error("Error updating booking in Supabase:", error);
    return null;
  }
  return getBooking(id);
}

export async function deleteBooking(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) {
    console.error("Error deleting booking from Supabase:", error);
  }
}
