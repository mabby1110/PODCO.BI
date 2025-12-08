import { getRange } from '$lib/server/googleApi';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const actividades_fijas = await getRange('actividades_fijas!A:D');
  
  return {
    actividades_fijas
  };
};