import { getVentasRange } from '$lib/server/googleApi';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const ventas = await getVentasRange();
  
  return {
    ventas
  };
};