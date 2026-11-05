// Booking dates travel as "YYYY-MM-DD" strings

export interface DayHours {
  isOpen: boolean;
  fromHour: number;
  toHour: number;
}

export interface Availability {
  // Indexed like Date.getDay(): 0 = Sunday
  weekly: DayHours[];
  blockedDates: string[];
}

const WEEKDAY_HOURS: DayHours = { isOpen: true, fromHour: 9, toHour: 17 };
const CLOSED_DAY: DayHours = { isOpen: false, fromHour: 9, toHour: 17 };

export const DEFAULT_AVAILABILITY: Availability = {
  weekly: [
    CLOSED_DAY,
    WEEKDAY_HOURS,
    WEEKDAY_HOURS,
    WEEKDAY_HOURS,
    WEEKDAY_HOURS,
    WEEKDAY_HOURS,
    CLOSED_DAY,
  ],
  blockedDates: [],
};

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Returns the opening hours of a date, or null if it can't be booked.
// Parsed as UTC so the result is the same on the server and in the browser.
export function getDayHours(
  dateKey: string,
  availability: Availability
): DayHours | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return null;
  if (availability.blockedDates.includes(dateKey)) return null;
  const hours = availability.weekly[new Date(`${dateKey}T00:00:00Z`).getUTCDay()];
  return hours?.isOpen ? hours : null;
}

export function getFirstBookableDate(
  now: Date,
  availability: Availability
): string | null {
  const date = new Date(now);
  for (let i = 0; i < 366; i++) {
    const dateKey = toDateKey(date);
    const hours = getDayHours(dateKey, availability);
    // The last slot starts an hour before closing, after that today is gone
    if (hours && (i > 0 || now.getHours() < hours.toHour - 1)) {
      return dateKey;
    }
    date.setDate(date.getDate() + 1);
  }
  return null;
}

export function getSlotError(
  date: string,
  fromHour: number,
  toHour: number,
  availability: Availability
): string | null {
  const hours = getDayHours(date, availability);
  if (!hours) return "Erre a napra nem lehet időpontot foglalni.";
  if (
    !Number.isInteger(fromHour) ||
    !Number.isInteger(toHour) ||
    fromHour < hours.fromHour ||
    toHour > hours.toHour ||
    toHour <= fromHour
  ) {
    return `Ezen a napon csak ${hours.fromHour}:00 és ${hours.toHour}:00 között lehet időpontot foglalni.`;
  }
  return null;
}
