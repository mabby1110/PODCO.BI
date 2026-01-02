<script lang="ts">
	import ButtonA from '$lib/components/ButtonA.svelte';
	import CardC from '$lib/components/CardC.svelte';
	import CardD from '$lib/components/CardD.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import { appState } from '$lib/stores/appState.svelte';
	import FormModal from '$lib/components/FormModal.svelte';
	import { selectedEvent } from '$lib/stores/selectedEvent.js';
	import Filter from '$lib/components/Filter.svelte';

	let { data } = $props();
	let weekOffset = $state(0); // 0 = semana actual, 1 = siguiente, -1 = anterior

	// Navegar semanas
	function previousWeek() {
		weekOffset -= 1;
	}

	function nextWeek() {
		weekOffset += 1;
	}

	function goToCurrentWeek() {
		weekOffset = 0;
	}
</script>

<div class="page-content">
	<div class="title">
		<h1>Actividades</h1>
	</div>
	<div class="details">
		{#if $selectedEvent}
		<CardD>
			<p>detalles</p>
			<p>{$selectedEvent.historia}</p>
			<p>{$selectedEvent.id}</p>
		</CardD>
		{/if}
	</div>
	<div class="actions">
		<div class="calendar-actions">
			<button onclick={previousWeek} class="butter">← Anterior</button>
			<button onclick={goToCurrentWeek} class="butter">Semana Actual</button>
			<button onclick={nextWeek} class="butter">Siguiente →</button>
		</div>
		<FormModal />
		<button onclick={() => appState.toggleDnd()} class="butter">
			Editar: {$appState.dnd ? 'si' : 'no'}
		</button>
		<Filter/>
	</div>

	<div class="calendar">
		<Calendar googleEvents={data.actividades} {weekOffset} />
	</div>
</div>

<style>
	.page-content {
		display: flex;
		flex-direction: column;
		overflow: auto;
		gap: var(--a);
	}
	.title {
		padding: var(--a);
	}
	.title h1 {
		height: var(--d);
	}
	.details {
		display: flex;
		flex-wrap: wrap;
		gap: var(--a);
	}
	.actions {
		display: flex;
		gap: var(--a);
		flex-wrap: wrap;
	}
	.calendar {
		border: 1px solid var(--color-muted);
		border-radius: var(--a);
		flex-grow: 1;
		overflow: auto;
		display: flex;
	}
	.calendar-actions {
		display: flex;
		gap: var(--a);
	}
</style>
