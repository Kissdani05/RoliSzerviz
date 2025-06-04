import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import path from 'path';
import fs from 'fs';

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || process.env.BOOKING_EMAIL_USER;

// Scopes required for Google Calendar
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// Write service account JSON from env if needed (for Vercel/serverless)
const SERVICE_ACCOUNT_PATH = path.resolve(process.cwd(), 'google-service-account.json');
if (!fs.existsSync(SERVICE_ACCOUNT_PATH) && process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
  fs.writeFileSync(SERVICE_ACCOUNT_PATH, process.env.GOOGLE_SERVICE_ACCOUNT_JSON, 'utf-8');
}

// Helper to get JWT client
function getGoogleAuth() {
  return new JWT({
    keyFile: SERVICE_ACCOUNT_PATH,
    scopes: SCOPES,
  });
}

export async function addBookingToCalendar({
  summary,
  description,
  startDateTime,
  endDateTime,
  location,
}: {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
}) {
  const auth = getGoogleAuth();
  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
    summary,
    description,
    start: { dateTime: startDateTime, timeZone: 'Europe/Budapest' },
    end: { dateTime: endDateTime, timeZone: 'Europe/Budapest' },
    location,
  };

  try {
    const res = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
    });
    return res.data;
  } catch (error) {
    console.error('Google Calendar event insert error:', error);
    throw error;
  }
}
