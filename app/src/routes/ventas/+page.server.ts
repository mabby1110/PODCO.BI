import { getRange, appendRow } from '$lib/server/googleApi';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    
    console.log("\nventas loaded\n");
    // Obtener los datos, donde la primera fila son los encabezados
    const historial_oportunidades_array = await getRange('historial_oportunidades!A:J');

    if (!historial_oportunidades_array || historial_oportunidades_array.length === 0) {
        return {
            historial_oportunidades_json: []
        };
    }

    // 1. Extraer encabezados y filas de datos
    const headers = historial_oportunidades_array[0];
    const dataRows = historial_oportunidades_array.slice(1);

    // 2. Mapear las filas de datos a un array de objetos JSON
    const historial_oportunidades_json = dataRows.map(row => {
        // 3. Crear el objeto emparejando valores con encabezados
        const obj: { [key: string]: any } = {};
        headers.forEach((header: string, index: number) => {
            // Asigna el valor o `null` si la fila no tiene un valor para ese encabezado
            obj[header] = row[index] !== undefined ? row[index] : null;
        });
        return obj;
    });

    return {
        // Retorna la estructura JSON mapeada
        historial_oportunidades_json
    };
};

export const actions: Actions = {
	addEvent: async ({ request }) => {
		const formData = await request.formData();
		const actividad = formData.get('actividad');
		const descripcion = formData.get('descripcion');
		const documentacion = formData.get('documentacion');
		const mantenimiento = formData.get('mantenimiento');

		await appendRow('actividades_fijas', [actividad, descripcion, documentacion, mantenimiento]);

		return { success: true };
	}
};
