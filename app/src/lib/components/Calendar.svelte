<script lang="ts">
	import CardA from './CardA.svelte';
	import { draggable, dropzone } from '$lib/actions/dnd';
	import { filtrarConsecutivo } from '$lib/utils/util';
	import { filterStore } from '$lib/stores/filterStore.svelte';
	import { appState } from '$lib/stores/appState.svelte';

	const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom'];
	const hoursRangePerDay = { start: 8, end: 18 };
	const SLOT_MINUTES = 15;
	const CELL_HEIGHT = 48; // px, ajusta a tu CSS real

	const hours = $derived(
		Array.from(
			{ length: ((hoursRangePerDay.end - hoursRangePerDay.start) * 60) / SLOT_MINUTES },
			(_, i) => {
				const total = hoursRangePerDay.start * 60 + i * SLOT_MINUTES;
				return {
					hour: Math.floor(total / 60),
					minute: total % 60
				};
			}
		)
	);

	const {
		googleEvents,
		weekOffset // 0 = semana actual, 1 = siguiente, -1 = anterior
	} = $props();

	const [headers, ...rows] = googleEvents;
	// Datos originales sin filtrar
	const eventListOriginal = $state(
		rows.map((row) => ({
			id: row[0],
			id_cliente: row[1],
			id_agente: row[2],
			duracion: row[3], // Formato: "00:30:00" o "01:00:00"
			inicio: row[4], // Formato: "30/12/2025 12:00:00"
			fin: row[5], // Formato: "31/12/2025 12:00:00"
			motivo: row[6],
			historia: row[7],
			cotizaciones: row[8],
			documentos: row[9],
			fase: row[10]
		}))
	);

	// Lista filtrada derivada reactivamente
	const eventList = $derived(
		filterStore.atributo !== ''
			? filtrarConsecutivo(filterStore.atributo, 'id_agente', eventListOriginal)
			: eventListOriginal
	);

	const weekDates = $derived(getWeekDates(weekOffset));

	// Obtener el año de la semana actual
	const currentYear = $derived(weekDates[0].getFullYear());

	// Filtrar eventos de la semana actual
	const weekEvents = $derived.by(() => {
		const weekDateStrings = weekDates.map((date) => formatDate(date));

		return eventList.filter((event) => {
			const parsed = parseDateTimeString(event.inicio);
			if (!parsed) return false;

			return weekDateStrings.includes(parsed.date);
		});
	});

	// Obtener las fechas de la semana (lunes a viernes)
	function getWeekDates(offset: number = 0) {
		const now = new Date();
		// Crear fecha a medianoche para evitar problemas de zona horaria
		now.setHours(0, 0, 0, 0);

		const dayOfWeek = now.getDay();
		const monday = new Date(now);

		// Ajustar al lunes de la semana actual (0 = domingo, 1 = lunes)
		const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
		monday.setDate(now.getDate() + diff + offset * 7);

		return Array.from({ length: 7 }, (_, i) => {
			const date = new Date(monday);
			date.setDate(monday.getDate() + i);
			date.setHours(0, 0, 0, 0); // Asegurar medianoche
			return date;
		});
	}
	// Formatear fecha a DD/MM/YYYY
	function formatDate(date: Date): string {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}

	// Parsear fecha y hora del formato "DD/MM/YYYY HH:MM:SS" o "D/MM/YYYY HH:MM:SS"
	function parseDateTimeString(
		dateTimeStr: string
	): { date: string; hour: number; minute: number } | null {
		const [datePart, timePart] = dateTimeStr?.trim().split(' ') ?? [];
		if (!datePart || !timePart) return null;

		const [h, m] = timePart.split(':').map(Number);
		const [d, mo, y] = datePart.split('/');

		return {
			date: `${d.padStart(2, '0')}/${mo.padStart(2, '0')}/${y}`,
			hour: h,
			minute: m
		};
	}

	function getEvent(hour: number, minute: number, dateStr: string) {
		return weekEvents.find((event) => {
			const p = parseDateTimeString(event.inicio);
			return p && p.date === dateStr && p.hour === hour && p.minute === minute;
		});
	}

	async function handleDrop(eventId: string, hour: number, minute: number, dateStr: string) {
		const i = eventList.findIndex((e) => e.id === eventId);
		if (i === -1) return;

		const inicio = `${dateStr} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;

		// calcular fin según duración
		const slots = durationToSlots(eventList[i].duracion);
		const base = new Date(
			`${dateStr.split('/').reverse().join('-')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`
		);
		base.setMinutes(base.getMinutes() + slots * SLOT_MINUTES);

		const fin = `${dateStr} ${String(base.getHours()).padStart(2, '0')}:${String(base.getMinutes()).padStart(2, '0')}:00`;

		// persistir
		await fetch('/api/editar', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: eventId, inicio, fin })
		});

		// estado local
		eventList[i] = {
			...eventList[i],
			inicio,
			fin
		};
	}

	function durationToSlots(d: string): number {
		const [h, m] = d.split(':').map(Number);
		return Math.max(1, (h * 60 + m) / SLOT_MINUTES);
	}

	function isEventStart(hour: number, minute: number, dateStr: string, event) {
		const p = parseDateTimeString(event.inicio);
		return p && p.date === dateStr && p.hour === hour && p.minute === minute;
	}

	$effect(() => {
		console.log('filterStore en calendario: ', filterStore.atributo !== '', filterStore.atributo);
		console.log('event list: ', eventList.length);
	});
</script>

<div class="calendar-container">
	<table>
		<thead>
			<tr>
				<th class="corner">{currentYear}</th>
				{#each weekDates as date, i}
					<th>
						<div class="day-header">
							<div>{weekdays[i]}</div>
							<div class="date-label">{formatDate(date).slice(0, 5)}</div>
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each hours as h}
				<tr>
					<td class="hour-cell">
						{String(h.hour).padStart(2, '0')}:{String(h.minute).padStart(2, '0')}
					</td>
					{#each weekDates as date}
						{@const dateStr = formatDate(date)}
						<td
							class="{$appState.calendarCards ? 'max' : 'minimize'} event-cell"
							use:dropzone={{
								on_dropzone: (eventId: string) => handleDrop(eventId, h.hour, h.minute, dateStr)
							}}
						>
							{#if getEvent(h.hour, h.minute, dateStr)}
								{@const event = getEvent(h.hour, h.minute, dateStr)}

								{#if isEventStart(h.hour, h.minute, dateStr, event)}
									<div
										class="event-wrapper"
										style={`height:${durationToSlots(event.duracion) * CELL_HEIGHT}px`}
										use:draggable={event.id}
									>
										<CardA {event} />
									</div>
								{/if}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.calendar-container {
		flex-grow: 1;
		gap: 16px;
	}

	.calendar-container {
		overflow: auto;
		display: flex;
	}

	.calendar-container table {
		flex-grow: 1;
		border-collapse: collapse;
		border-radius: 8px;
	}

	.calendar-container th,
	.calendar-container td {
		position: sticky;
		background-color: transparent;
		gap: 1px;
	}

	.calendar-container th {
		padding: 8px;
		position: sticky;
		top: 0;
		z-index: 9;
		backdrop-filter: blur(16px);
	}

	.day-header {
		display: flex;
		flex-direction: column;
		gap: 4px;
		align-items: center;
	}

	.date-label {
		font-size: 0.75em;
		opacity: 0.7;
		font-weight: normal;
	}

	.calendar-container .corner {
		position: sticky;
		top: 0;
		left: 0;
		z-index: 99;
	}

	.hour-cell {
		position: sticky;
		left: 0;
		z-index: 9;
		padding: 8px;
		text-align: center;
		backdrop-filter: blur(16px);
	}

	.event-cell {
		position: relative;
		border-right: 1px solid var(--color-secondary);
		border-bottom: 1px solid var(--color-secondary);
	}

	.event-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
	}
</style>
