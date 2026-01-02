/**
 * Convierte el resultado de getRange en un array de objetos JSON
 * @param data - Array bidimensional donde la primera fila son los encabezados
 * @returns Array de objetos con los datos mapeados
 */
export function makeJson(data: any[][] | null | undefined): Record<string, any>[] {
    if (!data || data.length === 0) {
        return [];
    }

    // Extraer encabezados y filas de datos
    const headers = data[0];
    const dataRows = data.slice(1);

    // Mapear las filas de datos a objetos JSON
    return dataRows.map(row => {
        const obj: Record<string, any> = {};
        headers.forEach((header: string, index: number) => {
            obj[header] = row[index] !== undefined ? row[index] : null;
        });
        return obj;
    });
}

type Evento = Record<string, any>;

export function filtrarConsecutivo<T extends Evento>(
	keyword: string | number,
	atributo: keyof T,
	eventos: T[]
): T[] {
    const k = String(keyword).toLowerCase();
	return eventos.filter(e =>
		String(e[atributo] ?? '').toLowerCase().includes(k)
	);
}
