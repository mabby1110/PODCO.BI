<script lang="ts">
	import { appState } from '$lib/stores/appState.svelte';
	import { filterStore } from '$lib/stores/filterStore.svelte.js';
	import FormModal from '$lib/components/FormModal.svelte';
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

<div class="controls-panel" transition:slide bind:this={panelToolsElement}>
	<!-- Controles principales -->
	<div class="control-group main-controls">
		<button onclick={() => appState.toggleCalendarView()} class="butter primary">
			{$appState.calendarView ? '📋 Vista Lista' : '📅 Vista Calendario'}
		</button>
		<button onclick={() => (appState.toggleAddModal())} class="butter">Agregar Evento</button>
		<Filter />
	</div>
	<!-- Controles específicos del calendario -->
	{#if $appState.calendarView}
		<div class="control-group page-controls">
			<div class="calendar-navigation">
				<button onclick={previousWeek} class="butter nav-btn" title="Semana anterior"> ← </button>
				<button onclick={goToCurrentWeek} class="butter current-week"> Semana Actual </button>
				<button onclick={nextWeek} class="butter nav-btn" title="Semana siguiente"> → </button>
			</div>

			<div class="calendar-options">
				<button
					onclick={() => appState.toggleDnd()}
					class="butter toggle"
					class:active={$appState.dnd}
				>
					✏️ {$appState.dnd ? 'Edición Activada' : 'Activar Edición'}
				</button>
				<button onclick={() => appState.toggleMinimizedCalendarCards()} class="butter toggle">
					{$appState.calendarCards ? '📏 Minimizar' : '📐 Expandir'}
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	/* Panel de controles */
	.controls-panel {
		background: var(--y2k);
		backdrop-filter: blur(4px);
		border: 1px solid var(--color-muted);
		border-radius: var(--a);
		padding: var(--b);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		display: flex;
		flex-direction: column;
		gap: var(--b);
		min-width: 300px;
	}

	.control-group {
		display: flex;
		flex-direction: column;
		gap: var(--a);
	}

	.main-controls {
		display: flex;
		flex-direction: row;
		gap: var(--a);
	}

	.butter {
		padding: 0.75rem var(--b);
		font-weight: 500;
		white-space: nowrap;
	}

	/* Navegación del calendario */
	.page-controls {
		border-top: 1px solid var(--color-muted);
		padding-top: var(--b);
		display: flex;
		flex-direction: row;
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
		flex: 1;
		display: flex;
		gap: var(--a);
	}
</style>
