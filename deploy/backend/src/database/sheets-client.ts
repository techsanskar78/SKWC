import { google } from 'googleapis';
import { getGoogleAuth } from './google-auth';

let sheetsClient: ReturnType<typeof google.sheets> | null = null;

export function getSheetsClient() {
  if (sheetsClient) return sheetsClient;
  sheetsClient = google.sheets({ version: 'v4', auth: getGoogleAuth() });
  return sheetsClient;
}

export const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID || '';
