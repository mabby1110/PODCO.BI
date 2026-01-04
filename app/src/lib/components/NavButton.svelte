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
		<button onclick={() => appState.toggleCalendarView()} class="butter primary">
			{$appState.calendarView ? '📋 Lista' : '📅 Calendario'}
		</button>
		<button onclick={() => appState.toggleAddModal()} class="butter">Agregar Evento</button>
		<button
			in:slide={{ delay: 200 }}
			class="butter actions-button"
			onclick={() => appState.resetPanelPosition()}
		>
			Resetear posición</button
		>
		<button
			in:slide={{ delay: 200 }}
			onclick={() => {
				appState.togglePageActions();
				expanded = !expanded;
			}}
			class="butter reset-button"
		>
			{$appState.calendarView ? 'mostrar acciones' : 'ocultar acciones'}
		</button>
	{/if}
</div>

<style>
	.nav-container {
		position: fixed;
		top: var(--a);
		right: var(--a);
		z-index: 1000;
		display: flex;
		flex-direction: column;
		gap: var(--a);
		max-width: 96vw;
	}

	button {
		background: var(--y2k);
		backdrop-filter: blur(4px);
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
	.reset-button {
		color: var(--color-text);
		background-color: var(--color-highlight);
	}
	.actions-button {
		color: white;
		background-color: var(--color-contrast);
	}
</style>
