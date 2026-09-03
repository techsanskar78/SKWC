import { google } from 'googleapis';

let jwt: InstanceType<typeof google.auth.JWT> | null = null;

export function getGoogleAuth() {
  if (jwt) return jwt;

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !key) {
    throw new Error('Google credentials are not configured.');
  }

  jwt = new google.auth.JWT({
    email,
    key: key.replace(/\\n/g, '\n'),
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
    ],
  });

  return jwt;
}
