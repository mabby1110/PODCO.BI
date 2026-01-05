<script lang="ts">
	import { appState } from '$lib/stores/appState.svelte';
	import { filterStore } from '$lib/stores/filterStore.svelte.js';
	import Filter from '$lib/components/Filter.svelte';
	import { slide } from 'svelte/transition';

	let panelToolsElement: HTMLElement;
	// Navegar semanas
	function previousWeek() {
		filterStore.weekOffset -= 1;
	}

	function nextWeek() {
		filterStore.weekOffset += 1;
	}

	function goToCurrentWeek() {
		filterStore.weekOffset = 0;
	}
</script>

<div class="container" in:slide>
	<Filter />
	<button onclick={() => appState.toggleAddModal()} class="butter">Agregar Evento</button>
	<!-- Controles específicos del calendario -->
	{#if $appState.calendarView}
		<button onclick={() => appState.toggleDnd()} class="butter toggle" class:active={$appState.dnd}>
			✏️ {$appState.dnd ? 'Edición Activada' : 'Activar Edición'}
		</button>
		<button onclick={() => appState.toggleMinimizedCalendarCards()} class="butter toggle">
			{$appState.calendarCards ? '📏 Minimizar' : '📐 Expandir'}
		</button>
		<div class="calendar-navigation">
			<button onclick={previousWeek} class="butter nav-btn" title="Semana anterior"> ← </button>
			<button onclick={goToCurrentWeek} class="butter current-week"> Semana Actual </button>
			<button onclick={nextWeek} class="butter nav-btn" title="Semana siguiente"> → </button>
		</div>
	{/if}
</div>

<style>
	/* Panel de controles */
	.container {
		background: var(--y2k);
		backdrop-filter: blur(4px);
		border: 1px solid var(--color-muted);
		border-radius: var(--a);
		padding: var(--a);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		display: flex;
		flex-wrap: wrap;
		gap: var(--a);
		min-width: 300px;
	}

	.butter {
		padding: 0.75rem var(--b);
		font-weight: 500;
		white-space: nowrap;
	}
	.nav-btn {
		min-width: 50px;
	}

	.current-week {
		text-align: center;
		flex-grow: 1;
	}

	.toggle.active {
		background: var(--color-contrast);
		color: white;
	}
	.calendar-navigation {
		display: flex;
		gap: var(--a);
		flex-grow: 1;
	}
</style>
