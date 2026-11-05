import { formatInTimeZone } from "date-fns-tz";
import { Booking, listBookings } from "./bookingStore";
import { listTransactions } from "./transactions";

export interface MonthStats {
  month: string;
  bookings: number;
  income: number;
  expense: number;
}

export interface CountRow {
  label: string;
  count: number;
}

export interface AdminAnalytics {
  months: MonthStats[];
  totals: {
    bookings: number;
    pending: number;
    upcoming: number;
    acceptanceRate: number | null;
    income: number;
    expense: number;
  };
  services: CountRow[];
  statuses: CountRow[];
}

const MAX_SERVICE_ROWS = 8;

const STATUS_LABELS: Record<Booking["status"], string> = {
  pending: "Függőben",
  accepted: "Elfogadva",
  proposed: "Új időpont ajánlva",
  client_accepted: "Ügyfél elfogadta",
  client_rejected: "Ügyfél elutasította",
  rejected: "Elutasítva",
};

// Once the client accepts a proposal the proposed date is the real one
function appointmentDate(booking: Booking): string {
  return booking.status === "client_accepted" && booking.newDate
    ? booking.newDate
    : booking.originalDate;
}

function lastMonths(count: number): string[] {
  const now = new Date();
  const year = Number(formatInTimeZone(now, "Europe/Budapest", "yyyy"));
  const month = Number(formatInTimeZone(now, "Europe/Budapest", "MM"));
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(Date.UTC(year, month - 1 - (count - 1 - i), 1));
    return date.toISOString().slice(0, 7);
  });
}

export async function getAdminAnalytics(monthCount: number): Promise<AdminAnalytics> {
  const [bookings, transactions] = await Promise.all([
    listBookings(),
    listTransactions(),
  ]);
  const today = formatInTimeZone(new Date(), "Europe/Budapest", "yyyy-MM-dd");

  const months = lastMonths(monthCount);
  const stats = new Map<string, MonthStats>(
    months.map((month) => [month, { month, bookings: 0, income: 0, expense: 0 }])
  );

  const serviceCounts = new Map<string, number>();
  const statusCounts = new Map<Booking["status"], number>();
  let bookingTotal = 0;
  let accepted = 0;
  let decided = 0;

  for (const booking of bookings) {
    const row = stats.get(appointmentDate(booking).slice(0, 7));
    if (!row) continue;
    row.bookings += 1;
    bookingTotal += 1;
    statusCounts.set(booking.status, (statusCounts.get(booking.status) ?? 0) + 1);
    if (booking.status === "accepted" || booking.status === "client_accepted") {
      accepted += 1;
      decided += 1;
    } else if (booking.status === "rejected" || booking.status === "client_rejected") {
      decided += 1;
    }
    for (const service of booking.services) {
      // Free-text "Egyéb: ..." entries count as one service
      const label = service.startsWith("Egyéb") ? "Egyéb" : service;
      serviceCounts.set(label, (serviceCounts.get(label) ?? 0) + 1);
    }
  }

  let income = 0;
  let expense = 0;
  for (const transaction of transactions) {
    const row = stats.get(transaction.date.slice(0, 7));
    if (!row) continue;
    row[transaction.type] += transaction.amount;
    if (transaction.type === "income") income += transaction.amount;
    else expense += transaction.amount;
  }

  const toRows = (counts: Iterable<[string, number]>): CountRow[] =>
    [...counts]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);

  const isConfirmed = (booking: Booking) =>
    booking.status === "accepted" || booking.status === "client_accepted";

  return {
    months: months.map((month) => stats.get(month)!),
    totals: {
      bookings: bookingTotal,
      // Open and upcoming work is shown regardless of the selected period
      pending: bookings.filter((booking) => booking.status === "pending").length,
      upcoming: bookings.filter(
        (booking) => isConfirmed(booking) && appointmentDate(booking) >= today
      ).length,
      acceptanceRate: decided ? Math.round((accepted / decided) * 100) : null,
      income,
      expense,
    },
    services: toRows(serviceCounts).slice(0, MAX_SERVICE_ROWS),
    statuses: toRows(
      [...statusCounts].map(([status, count]): [string, number] => [
        STATUS_LABELS[status],
        count,
      ])
    ),
  };
}
