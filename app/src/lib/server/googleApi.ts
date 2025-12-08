import { google } from 'googleapis';
import { GOOGLE_APPLICATION_CREDENTIALS, GOOGLE_SHEET_ID } from '$env/static/private';
import { readFileSync } from 'fs';

const credentials = JSON.parse(readFileSync(GOOGLE_APPLICATION_CREDENTIALS, 'utf-8'));

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
});

const sheets = google.sheets({ version: 'v4', auth });

export async function getVentasRange(range: string = 'historico!A1:H322') {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEET_ID,
    range
  });
  
  return response.data.values || [];
}