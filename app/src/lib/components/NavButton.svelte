<script lang="ts">
	import { slide } from 'svelte/transition';
	import { appState } from '$lib/stores/appState.svelte';

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

	$effect(() => {
		const unsubscribe = appState.subscribe(state => {
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
		
		offsetX = e.clientX - startX;
		offsetY = e.clientY - startY;
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
</script>

<button 
	bind:this={panelElement}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	onpointercancel={handlePointerCancel}
	class="panel"
	class:dragging={isDragging}
	style="transform: translate({offsetX}px, {offsetY}px);"
>
	<div class="logo">
		<img src="bms-logo.svg" alt="BMS" />
		<div class="title" transition:slide={{ axis: 'x' }}>
			<p>COMPONENTES Y EQUIPOS</p>
			<p>INDUSTRIALES</p>
		</div>
	</div>
	{#if expanded}
		<div class="nav-links" transition:slide>
			<a href="/actividades">Tablero de actividades</a>
			<a href="#">Tablero de Ventas</a>
			<a href="#">Tablero de Compras</a>
			<button onclick={() => appState.resetPanelPosition()}>Resetear posición</button>
		</div>
	{/if}
</button>

<style>
	.nav-links {
		display: flex;
		flex-direction: column;
		gap: var(--a);
		align-items: end;
		margin-top: var(--b);
		margin-right: var(--c);
		width: 100%;
		pointer-events: auto;
	}
	.nav-links a {
		min-width: var(--d);
	}
	.nav-links button {
		min-width: var(--d);
		background: transparent;
		border: 1px solid var(--color-muted);
		padding: 0.5rem;
		cursor: pointer;
		border-radius: var(--a);
	}
	.nav-links button:hover {
		background: var(--color-muted);
	}
	.logo {
		display: flex;
		align-items: center;
	}
	.logo img {
		pointer-events: none;
		height: var(--d);
	}
	.title {
		margin: 0 var(--c);
		white-space: nowrap;
		flex-grow: 1;
	}
	button {
		background-color: var(--color-primary);
		border: 1px solid var(--color-muted);
		border-radius: var(--a);
		padding: var(--a);
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		float: right;
		max-width: 96vw;
		touch-action: none;
		user-select: none;
		will-change: transform;
	}

	button.dragging {
		cursor: move;
	}

	button:hover {
		background-color: var(--color-secondary);
	}

	button:active {
		background-color: var(--color-secondary);
	}
</style>