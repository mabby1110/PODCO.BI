import { deleteRowById } from '$lib/server/googleApi';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const data = await request.formData();
	const id = data.get('id')?.toString();

	if (!id) {
		return json({ success: false }, { status: 400 });
	}

	await deleteRowById(id, 'historial_actividades!A:Z');

	return json({ success: true });
}
