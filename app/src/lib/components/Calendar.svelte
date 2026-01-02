<script lang="ts">
	import CardA from './CardA.svelte';
	import { draggable, dropzone } from '$lib/actions/dnd';

	const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
	const hoursRangePerDay = { start: 8, end: 18 };
	const {
		googleEvents,
		weekOffset // 0 = semana actual, 1 = siguiente, -1 = anterior
	} = $props();

	const [headers, ...rows] = googleEvents;
	let eventList = $state(
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
	console.log('weekEvents', eventList);
	const hours = $derived(
		Array.from(
			{ length: hoursRangePerDay.end - hoursRangePerDay.start },
			(_, i) => hoursRangePerDay.start + i
		)
	);

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

		return Array.from({ length: 5 }, (_, i) => {
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
	function parseDateTimeString(dateTimeStr: string): { date: string; hour: number } | null {
		if (!dateTimeStr) return null;

		const trimmed = dateTimeStr.trim();
		const parts = trimmed.split(' ');

		if (parts.length !== 2) return null;

		const datePart = parts[0]; // "30/12/2025" o "3/01/2026"
		const timePart = parts[1]; // "12:00:00"

		const timeComponents = timePart.split(':').map(Number);
		if (timeComponents.length < 2) return null;

		const [hours] = timeComponents;

		// Normalizar la fecha para que siempre tenga formato DD/MM/YYYY
		const dateComponents = datePart.split('/');
		if (dateComponents.length !== 3) return null;

		const [day, month, year] = dateComponents;
		const normalizedDate = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;

		return {
			date: normalizedDate,
			hour: hours
		};
	}
	// Obtener evento para una hora y fecha específica
	function getEvent(hour: number, dateStr: string) {
		return weekEvents.find((event) => {
			const parsed = parseDateTimeString(event.inicio);
			if (!parsed) return false;

			return parsed.date === dateStr && parsed.hour === hour;
		});
	}

	// Manejar el drop de eventos
	function handleDrop(eventId: string, newHour: number, dateStr: string) {
		const eventIndex = eventList.findIndex((event) => event.id === eventId);
		if (eventIndex === -1) return;

		const existingEvent = getEvent(newHour, dateStr);
		if (existingEvent && existingEvent.id !== eventId) return;

		const event = eventList[eventIndex];

		// Formatear la nueva hora
		const newHourStr = String(newHour).padStart(2, '0');
		const newTimeStr = `${newHourStr}:00:00`;

		// Actualizar evento con nueva fecha y hora
		eventList[eventIndex] = {
			...event,
			inicio: `${dateStr} ${newTimeStr}`
		};
	}

	// Debug logs (después de todas las declaraciones)
	$effect(() => {
		console.log('eventList', eventList);
		console.log('weekEvents', weekEvents);
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
			{#each hours as hour}
				<tr>
					<td class="hour-cell">{hour}:00</td>
					{#each weekDates as date}
						{@const dateStr = formatDate(date)}
						<td
							class="event-cell"
							use:dropzone={{
								on_dropzone: (eventId: string) => handleDrop(eventId, hour, dateStr)
							}}
						>
							{#if getEvent(hour, dateStr)}
								{@const event = getEvent(hour, dateStr)}
								<div class="event-wrapper" use:draggable={event.id}>
									<CardA {event} />
								</div>
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
		top: 0;
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
		width: var(--i);
		min-width: var(--e);
		backdrop-filter: blur(16px);
	}

	.event-cell {
		position: relative;
		min-width: var(--h);
		border-right: 1px solid var(--color-secondary);
		border-bottom: 1px solid var(--color-secondary);
	}

	.event-wrapper {
		width: 100%;
	}
</style>
