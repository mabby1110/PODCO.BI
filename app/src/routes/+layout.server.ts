import { getRange } from '$lib/server/googleApi';
import { makeJson } from '$lib/utils/util';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
    console.log("\nlayout data loaded\n");
    const clientes = makeJson(await getRange('clientes!A:B'));
    const agentes = makeJson(await getRange('agentes!A:B'));

    return {
        clientes,
        agentes
    };
};