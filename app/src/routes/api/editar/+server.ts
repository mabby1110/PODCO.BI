import { updateRowById } from '$lib/server/googleApi';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { id, inicio, fin } = await request.json();

	if (!id || !inicio) {
		return json({ error: 'datos incompletos' }, { status: 400 });
	}

	await updateRowById(
		id,
		{
			E: inicio, // columna inicio
			F: fin     // columna fin
		},
		'historial_actividades!A:K'
	);

	return json({ ok: true });
}
