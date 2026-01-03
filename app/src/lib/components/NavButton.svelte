<script lang="ts">
	import { slide } from 'svelte/transition';
	import { appState } from '$lib/stores/appState.svelte';
	import FormModal from './FormModal.svelte';
	import Filter from './Filter.svelte';
	import { filterStore } from '$lib/stores/filterStore.svelte';

	let { title } = $props();
	let expanded = $state(false);
	let isDragging = $state(false);
	let dragTimeout: ReturnType<typeof setTimeout> | null = null;
	let startX = $state(0);
	let startY = $state(0);
	let offsetX = $state(0);
	let offsetY = $state(0);
	let storeState = $state({ panelPosition: { x: 0, y: 0 } });
	let panelElement: HTMLElement;
	let panelToolsElement: HTMLElement;

	$effect(() => {
		const unsubscribe = appState.subscribe((state) => {
			storeState = state;
			offsetX = state.panelPosition.x;
			offsetY = state.panelPosition.y;
		});
		return unsubscribe;
	});

	function handlePointerDown(e: PointerEvent) {
		const target = e.target as HTMLElement;
		if (target.closest('.nav-links')) return;

		startX = e.clientX - offsetX;
		startY = e.clientY - offsetY;

		dragTimeout = setTimeout(() => {
			isDragging = true;
			panelElement?.setPointerCapture(e.pointerId);
		}, 150);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isDragging) return;

		let x = e.clientX - startX;
		let y = e.clientY - startY;

		const rect = panelElement.getBoundingClientRect();

		const minX = -rect.left + offsetX;
		const minY = -rect.top + offsetY;
		const maxX = window.innerWidth - rect.right + offsetX;
		const maxY = window.innerHeight - rect.bottom + offsetY;

		if (x < minX) x = minX;
		if (x > maxX) x = maxX;
		if (y < minY) y = minY;
		if (y > maxY) y = maxY;

		offsetX = x;
		offsetY = y;
	}

	function handlePointerUp(e: PointerEvent) {
		if (dragTimeout) {
			clearTimeout(dragTimeout);
			dragTimeout = null;
		}

		if (isDragging) {
			appState.setPanelPosition(offsetX, offsetY);
		} else {
			const target = e.target as HTMLElement;
			if (!target.closest('.nav-links')) {
				expanded = !expanded;

				if (expanded) {
					requestAnimationFrame(() => {
						requestAnimationFrame(clampToViewport);
					});
				}
			}
		}

		isDragging = false;
		panelElement?.releasePointerCapture(e.pointerId);
	}

	function handlePointerCancel() {
		if (dragTimeout) {
			clearTimeout(dragTimeout);
			dragTimeout = null;
		}
		isDragging = false;
	}

	// Navegar semanas
	function previousWeek() {
		filterStore.weekOffset += 1;
	}

	function nextWeek() {
		filterStore.weekOffset += 1;
	}

	function goToCurrentWeek() {
		filterStore.weekOffset = 0;
	}
	function clampToViewport() {
		if (!panelElement || !panelToolsElement) return;

		const panelRect = panelElement.getBoundingClientRect();
		const toolsRect = panelToolsElement.getBoundingClientRect();

		let x = offsetX;
		let y = offsetY;

		// derecha
		if (panelRect.right > window.innerWidth) {
			x -= panelRect.right - window.innerWidth;
		}

		// izquierda
		if (panelRect.left < 0) {
			x -= panelRect.left;
		}

		// abajo (panel + menú)
		if (panelRect.bottom + toolsRect.height > window.innerHeight) {
			y -= panelRect.bottom + toolsRect.height - window.innerHeight;
		}

		// arriba
		if (panelRect.top < 0) {
			y -= panelRect.top;
		}

		offsetX = x;
		offsetY = y;
		appState.setPanelPosition(x, y);
	}
</script>

<div class="nav-container" style="transform: translate({offsetX}px, {offsetY}px);">
	<button
		bind:this={panelElement}
		onpointerdown={handlePointerDown}
		onpointermove={handlePointerMove}
		onpointerup={handlePointerUp}
		onpointercancel={handlePointerCancel}
		class="panel"
		class:dragging={isDragging}
	>
		<div class="logo">
			<img src="bms-logo.svg" alt="BMS" />
			{#if expanded}
				<div class="title" transition:slide={{ axis: 'x' }}>
					<p>COMPONENTES Y EQUIPOS</p>
					<p>INDUSTRIALES</p>
				</div>
			{/if}
		</div>
	</button>

	{#if expanded}
		<div class="controls-panel" transition:slide bind:this={panelToolsElement}>
			<!-- Controles principales -->
			<div class="control-group main-controls">
				<button onclick={() => appState.toggleCalendarView()} class="butter primary">
					{$appState.calendarView ? '📋 Vista Lista' : '📅 Vista Calendario'}
				</button>
				<FormModal />
			</div>

			<!-- Filtros -->
			<div class="control-group">
				<Filter />
			</div>

			<!-- Controles específicos del calendario -->
			{#if $appState.calendarView}
				<div class="control-group calendar-controls">
					<div class="calendar-navigation">
						<button onclick={previousWeek} class="butter nav-btn" title="Semana anterior">
							←
						</button>
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

			<button onclick={() => appState.resetPanelPosition()}>Resetear posición</button>
		</div>
	{/if}
</div>

<style>
	.nav-container {
		position: fixed;
		top: var(--b);
		right: var(--b);
		z-index: 1000;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: var(--b);
		max-width: 96vw;
	}

	button {
		background-color: var(--color-primary);
		border: 1px solid var(--color-muted);
		border-radius: var(--a);
		padding: var(--a);
		cursor: pointer;
		touch-action: none;
		user-select: none;
		transition:
			background-color 0.2s,
			transform 0.1s;
	}

	button:hover {
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	button:active {
		transform: translateY(0);
	}

	.panel {
		display: flex;
		flex-direction: column;
		align-items: center;
		will-change: transform;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.panel.dragging {
		cursor: move;
		background-color: var(--color-highlight);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
	}

	.nav-links {
		display: flex;
		flex-direction: column;
		gap: var(--a);
		align-items: stretch;
		margin-top: var(--b);
		width: 100%;
		pointer-events: auto;
		padding: 0 var(--a);
	}

	.nav-links a,
	.nav-links button {
		min-width: 200px;
		padding: 0.75rem var(--b);
		text-align: center;
		border-radius: var(--a);
		transition: all 0.2s;
	}

	.nav-links a {
		text-decoration: none;
		background: var(--color-secondary);
		border: 1px solid var(--color-muted);
	}

	.nav-links a:hover {
		background: var(--color-highlight);
	}

	.nav-links button {
		background: transparent;
		border: 1px solid var(--color-muted);
	}

	.nav-links button:hover {
		background: var(--color-muted);
	}

	.logo {
		display: flex;
		align-items: center;
		gap: var(--b);
	}

	.logo img {
		pointer-events: none;
		height: var(--d);
	}

	.title {
		white-space: nowrap;
		font-size: 0.85rem;
		line-height: 1.2;
	}

	.title p {
		margin: 0;
		font-weight: 600;
	}

	/* Panel de controles */
	.controls-panel {
		background: var(--color-primary);
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

	.main-controls button {
		flex: 1;
	}

	.butter {
		padding: 0.75rem var(--b);
		font-weight: 500;
		white-space: nowrap;
	}

	.butter.primary {
		background: var(--color-highlight);
		font-weight: 600;
	}

	/* Navegación del calendario */
	.calendar-controls {
		border-top: 1px solid var(--color-muted);
		padding-top: var(--b);
	}

	.calendar-navigation {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: var(--a);
		align-items: center;
	}

	.nav-btn {
		padding: 0.75rem var(--b);
		font-size: 1.2rem;
		min-width: 50px;
	}

	.current-week {
		text-align: center;
	}

	.calendar-options {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--a);
		margin-top: var(--a);
	}

	.toggle.active {
		background: var(--color-accent);
		border-color: var(--color-accent);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.nav-container {
			max-width: 90vw;
		}

		.controls-panel {
			min-width: 280px;
		}

		.main-controls {
			flex-direction: column;
		}

		.calendar-options {
			grid-template-columns: 1fr;
		}

		.title {
			font-size: 0.75rem;
		}
	}
</style>
