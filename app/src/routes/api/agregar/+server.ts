import { appendRow } from '$lib/server/googleApi';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const data = await request.formData();

	await appendRow('clientes!A:C', [
		data.get('campo1'),
		data.get('campo2'),
		data.get('campo3')
	]);

	return json({ success: true });
}
