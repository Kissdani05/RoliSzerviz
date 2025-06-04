import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || process.env.BOOKING_EMAIL_USER;
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// Helper to get JWT client using credentials from env (no file write!)
function getGoogleAuth() {
  let credentials;
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  } else {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON env variable is missing');
  }
  return new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
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
