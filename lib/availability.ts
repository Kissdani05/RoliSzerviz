import { getPool } from "./db";
import { ensureSchema } from "./schema";
import { Availability, DayHours, DEFAULT_AVAILABILITY } from "./bookingDates";

export interface BlockedDate {
  date: string;
  reason: string | null;
}

async function readAvailability(): Promise<Availability> {
  await ensureSchema();
  const pool = getPool();
  const weeklyRows = await pool.query(
    "SELECT weekday, is_open, from_hour, to_hour FROM availability_weekly ORDER BY weekday"
  );
  const blockedRows = await pool.query("SELECT date FROM blocked_dates");
  return {
    weekly: weeklyRows.rows.map((row) => ({
      isOpen: row.is_open,
      fromHour: row.from_hour,
      toHour: row.to_hour,
    })),
    blockedDates: blockedRows.rows.map((row) => row.date),
  };
}

// Customers can still book on the default schedule if the database is down
export async function getAvailability(): Promise<Availability> {
  try {
    return await readAvailability();
  } catch (error) {
    console.error("Error reading availability from Postgres:", error);
    return DEFAULT_AVAILABILITY;
  }
}

export async function saveWeeklyHours(weekly: DayHours[]): Promise<void> {
  await ensureSchema();
  const pool = getPool();
  await Promise.all(
    weekly.map((day, weekday) =>
      pool.query(
        "UPDATE availability_weekly SET is_open = $2, from_hour = $3, to_hour = $4 WHERE weekday = $1",
        [weekday, day.isOpen, day.fromHour, day.toHour]
      )
    )
  );
}

export async function listBlockedDates(): Promise<BlockedDate[]> {
  await ensureSchema();
  const { rows } = await getPool().query(
    "SELECT date, reason FROM blocked_dates ORDER BY date"
  );
  return rows;
}

export async function addBlockedDate(date: string, reason: string | null): Promise<void> {
  await ensureSchema();
  await getPool().query(
    `INSERT INTO blocked_dates (date, reason) VALUES ($1, $2)
     ON CONFLICT (date) DO UPDATE SET reason = EXCLUDED.reason`,
    [date, reason]
  );
}

export async function removeBlockedDate(date: string): Promise<void> {
  await ensureSchema();
  await getPool().query("DELETE FROM blocked_dates WHERE date = $1", [date]);
}
