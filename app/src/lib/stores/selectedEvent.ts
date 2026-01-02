// src/lib/stores/selectedEvent.ts
import { writable } from 'svelte/store';

export type EventItem = {
	id: string;
	id_cliente: string;
	id_agente: string;
	duracion: string;
	inicio: string;
	fin: string;
	motivo: string;
	historia: string;
	cotizaciones: string;
	documentos: string;
	fase: string;
};

export const selectedEvent = writable<EventItem | null>(null);
