<script lang="ts">
	import CardA from './CardA.svelte';
	import { draggable, dropzone } from '$lib/actions/dnd';

	const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
	const hoursRangePerDay = { start: 8, end: 18 };

	let eventList = $state([
		{ id: '1', hour: 9, day: 'Lun', title: 'evento ejemplo', details: 'detalles del evento' },
		{
			id: '2',
			hour: 10,
			day: 'Mar',
			title: 'Reunión de equipo',
			details: 'Discusión de proyectos'
		},
		{
			id: '3',
			hour: 14,
			day: 'Mié',
			title: 'Presentación cliente',
			details: 'Propuesta comercial'
		},
		{ id: '4', hour: 11, day: 'Vie', title: 'Sesión de código', details: 'Code review semanal' },
		{ id: '5', hour: 16, day: 'Jue', title: 'Workshop diseño', details: 'UX/UI best practices' }
	]);

	// Generar array de horas
	const hours = $derived(
		Array.from(
			{ length: hoursRangePerDay.end - hoursRangePerDay.start },
			(_, i) => hoursRangePerDay.start + i
		)
	);

	// Función para encontrar evento en hora y día específicos
	function getEvent(hour: number, day: string) {
		return eventList.find((event) => event.hour === hour && event.day === day);
	}

	// Manejar el drop del evento
	function handleDrop(eventId: string, newHour: number, newDay: string) {
		const eventIndex = eventList.findIndex((event) => event.id === eventId);
		if (eventIndex !== -1) {
			// Verificar si ya existe un evento en esa celda
			const existingEvent = getEvent(newHour, newDay);
			if (!existingEvent || existingEvent.id === eventId) {
				eventList[eventIndex] = {
					...eventList[eventIndex],
					hour: newHour,
					day: newDay
				};
			}
		}
	}
</script>

<div class="time-grid">
	<table>
		<thead>
			<tr>
				<th class="corner">H/D</th>
				{#each weekdays as day}
					<th>{day}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each hours as hour}
				<tr>
					<td class="hour-cell">{hour}:00</td>
					{#each weekdays as day}
						<td
							class="event-cell"
							use:dropzone={{
								on_dropzone: (eventId: string) => handleDrop(eventId, hour, day)
							}}
						>
							{#if getEvent(hour, day)}
								{@const event = getEvent(hour, day)}
								<div use:draggable={event.id}>
									<CardA title={event.title} />
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
	.time-grid {
		overflow: auto;
		display: flex;
	}
	.time-grid table {
		flex-grow: 1;
		border-collapse: collapse;
		border-radius: 8px;
	}
	.time-grid th,
	.time-grid td {
		position: sticky;
		top: 0;
		background-color: transparent;
		outline: 1px solid rgba(0, 0, 0, 0.2);
		gap: 1px;
	}
	.time-grid th {
		padding: 8px;
		position: sticky;
		top: 0;
		z-index: 9;
		backdrop-filter: blur(16px);
	}
	.time-grid .corner {
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
		position: sticky;
		width: 60vw;
		min-height: var(--e);
	}
</style>
