<script lang="ts">
	import CardD from '$lib/components/CardD.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import { appState } from '$lib/stores/appState.svelte';
	import { selectedEvent } from '$lib/stores/selectedEvent.js';
	import CalendarList from '$lib/components/CalendarList.svelte';
	import ControlsPanel from '$lib/components/ControlsPanel.svelte';

	let { data } = $props();
</script>

<div class="page-content">
	<section class="title">
		<h1>Actividades</h1>
	</section>

	<section class="controls-panel">
		{#if $appState.pageActions}
			<ControlsPanel />
		{/if}
	</section>

	<section class="details">
		{#if $selectedEvent}
			<CardD />
		{/if}
	</section>

	<section class="calendar">
		{#if $appState.calendarView}
			<Calendar googleEvents={data.actividades} />
		{:else}
			<CalendarList {data} />
		{/if}
	</section>
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
	.calendar {
		border: 1px solid var(--color-muted);
		border-radius: var(--a);
		flex-grow: 1;
		overflow: auto;
		display: flex;
	}
</style>
