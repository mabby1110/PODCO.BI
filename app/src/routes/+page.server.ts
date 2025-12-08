import { getRange, appendRow } from '$lib/server/googleApi';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const actividades_fijas = await getRange('actividades_fijas!A:D');
  
  return {
    actividades_fijas
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