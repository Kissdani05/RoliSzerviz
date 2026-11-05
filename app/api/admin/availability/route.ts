import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/adminAuth";
import {
  addBlockedDate,
  getAvailability,
  listBlockedDates,
  removeBlockedDate,
  saveWeeklyHours,
} from "../../../../lib/availability";
import { DayHours } from "../../../../lib/bookingDates";

export const dynamic = "force-dynamic";

const isValidDate = (date: unknown): date is string =>
  typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date);

const isValidHours = (day: DayHours) =>
  typeof day?.isOpen === "boolean" &&
  Number.isInteger(day.fromHour) &&
  Number.isInteger(day.toHour) &&
  day.fromHour >= 0 &&
  day.toHour <= 24 &&
  day.fromHour < day.toHour;

async function currentState() {
  const [{ weekly }, blockedDates] = await Promise.all([
    getAvailability(),
    listBlockedDates(),
  ]);
  return { weekly, blockedDates };
}

const databaseError = (error: unknown) => {
  console.error("Error saving availability:", error);
  return NextResponse.json(
    { error: "Nem sikerült menteni a változást." },
    { status: 500 }
  );
};

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    return NextResponse.json(await currentState());
  } catch (error) {
    return databaseError(error);
  }
}

export async function PUT(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { weekly } = await request.json();
  if (!Array.isArray(weekly) || weekly.length !== 7 || !weekly.every(isValidHours)) {
    return NextResponse.json(
      { error: "A zárás időpontja legyen későbbi a nyitásnál." },
      { status: 400 }
    );
  }
  try {
    await saveWeeklyHours(weekly);
    return NextResponse.json(await currentState());
  } catch (error) {
    return databaseError(error);
  }
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { date, reason } = await request.json();
  if (!isValidDate(date)) {
    return NextResponse.json({ error: "Válassz érvényes dátumot." }, { status: 400 });
  }
  try {
    await addBlockedDate(date, typeof reason === "string" && reason.trim() ? reason.trim() : null);
    return NextResponse.json(await currentState());
  } catch (error) {
    return databaseError(error);
  }
}

export async function DELETE(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const date = new URL(request.url).searchParams.get("date");
  if (!isValidDate(date)) {
    return NextResponse.json({ error: "Érvénytelen dátum." }, { status: 400 });
  }
  try {
    await removeBlockedDate(date);
    return NextResponse.json(await currentState());
  } catch (error) {
    return databaseError(error);
  }
}
