import { getRange, appendRow } from '$lib/server/googleApi';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    console.log("\nActividades loaded\n");
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