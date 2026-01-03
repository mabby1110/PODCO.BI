import { getRange } from '$lib/server/googleApi';
import { makeJson } from '$lib/utils/util';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ depends, url }) => {
	depends('app:data');

	console.log('\nlayout data loaded\n');

	const clientes = makeJson(await getRange('clientes!A:B'));
	const agentes = makeJson(await getRange('agentes!A:B'));
	const fases_embudo_ventas = makeJson(await getRange('fases_embudo_ventas!A:C'));
	const actividades = await getRange('historial_actividades!A:K');
	if (url.pathname == '/') {
		throw redirect(307, '/actividades');
	}
	return {
		clientes,
		agentes,
		fases_embudo_ventas,
		actividades
	};
};
