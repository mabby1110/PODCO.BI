import { google } from 'googleapis';
import { GOOGLE_APPLICATION_CREDENTIALS, GOOGLE_SHEET_ID } from '$env/static/private';
import { readFileSync } from 'fs';
import crypto from 'crypto';

function generateId(prefix = 'BMS') {
	const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
	const hash = crypto.randomBytes(4).toString('hex');
	return `${prefix}-${date}-${hash}`;
}
const credentials = JSON.parse(GOOGLE_APPLICATION_CREDENTIALS);

const auth = new google.auth.GoogleAuth({
	credentials,
	scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

export async function getRange(range: string = 'historial_actividades!A:C') {
	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: GOOGLE_SHEET_ID,
		range
	});

	return response.data.values || [];
}

export async function updateRowById(
	id: string,
	newValues: { [key: string]: any },
	range: string = 'historial_actividades!A:C'
) {
	const values = await getRange(range);

	// Buscar la fila por ID en columna A
	const rowIndex = values.findIndex((row) => row[0] === id);

	if (rowIndex === -1) {
		throw new Error(`No se encontró registro con ID: ${id}`);
	}

	const rowNumber = rowIndex + 1; // Las hojas empiezan en 1
	const sheetName = range.split('!')[0];

	// Preparar las actualizaciones para cada columna
	const data = Object.entries(newValues).map(([column, value]) => ({
		range: `${sheetName}!${column}${rowNumber}`,
		values: [[value]]
	}));

	// Actualizar en un solo batch
	await sheets.spreadsheets.values.batchUpdate({
		spreadsheetId: GOOGLE_SHEET_ID,
		requestBody: {
			valueInputOption: 'RAW',
			data
		}
	});

	return { rowNumber, updated: newValues };
}
export async function appendRow(range: string = 'historial_actividades!A:C', values: any[]) {
	const id = generateId();

	const response = await sheets.spreadsheets.values.append({
		spreadsheetId: GOOGLE_SHEET_ID,
		range,
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: [[id, ...values]]
		}
	});

	return { id, response: response.data };
}
