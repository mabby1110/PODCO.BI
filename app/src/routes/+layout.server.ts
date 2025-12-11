import { getRange } from '$lib/server/googleApi';
import { makeJson } from '$lib/utils/util';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
    const clientes = makeJson(await getRange('clientes!A:B'));
    const agentes = makeJson(await getRange('agentes!A:B'));

    return {
        clientes,
        agentes
    };
};