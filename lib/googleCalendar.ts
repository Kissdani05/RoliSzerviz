import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import * as fs from 'fs';
import * as path from 'path';

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || process.env.BOOKING_EMAIL_USER;
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// Helper to get JWT client using credentials from env or file
function getGoogleAuth() {
  let credentials;
  
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    console.log('Using credentials from environment variable');
  } else {
    // Fallback to reading from file
    try {
      const credentialsPath = path.join(process.cwd(), 'google-service-account.json');
      const credentialsFile = fs.readFileSync(credentialsPath, 'utf8');
      credentials = JSON.parse(credentialsFile);
      console.log('Using credentials from file');
    } catch (error) {
      console.error('Error reading credentials file:', error);
      throw new Error('Neither GOOGLE_SERVICE_ACCOUNT_JSON env variable nor google-service-account.json file found');
    }
  }
  
  console.log('Credentials loaded for client_email:', credentials.client_email);
  
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
  console.log('Google Calendar function called with:', {
    summary,
    startDateTime,
    endDateTime,
    location,
    calendarId: CALENDAR_ID
  });

  const auth = getGoogleAuth();
  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
    summary,
    description,
    start: { dateTime: startDateTime, timeZone: 'Europe/Budapest' },
    end: { dateTime: endDateTime, timeZone: 'Europe/Budapest' },
    location,
  };

  console.log('Event object for Google Calendar:', event);

  try {
    const res = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
    });
    console.log('Calendar event created successfully:', res.data);
    return res.data;
  } catch (error) {
    console.error('Google Calendar event insert error:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    throw error;
  }
}
