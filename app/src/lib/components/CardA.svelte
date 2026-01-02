<script lang="ts">
	import { page } from '$app/state';
	import { draggable } from '$lib/actions/dnd';
	import { appState } from '$lib/stores/appState.svelte';
	import { selectedEvent } from '$lib/stores/selectedEvent';

	let { event } = $props();

	const { clientes, agentes } = $derived(page.data);

	const razon_social = clientes[event.id_cliente]?.razon_social ?? '';
	const agente = agentes[event.id_agente]?.nombre ?? '';
	const isDndEnabled = $derived($appState.dnd);
	let style;
	switch (event?.fase) {
		case '0':
			style = 'background-color: var(--color-perdida);';
			break;
		case '2':
			style = 'background-color: var(--color-analizar);';
			break;
		case '3':
			style = 'background-color: var(--color-cotizar);';
			break;
		case '4':
			style = 'background-color: var(--color-ganada);';
			break;
		case '5':
			style = 'background-color: var(--color-enviar);';
			break;
		case '6':
			style = 'background-color: var(--color-finalizar); color: white;';
			break;
		default:
			style = 'background-color: var(--color-prospecto);';
			break;
	}
	function select() {
		selectedEvent.set(event);
	}
</script>

<button {style} use:draggable={{ data: event.id, enabled: isDndEnabled }} onclick={select}>
	<div class="header">
		<strong>{razon_social}</strong>
	</div>

	<div class="meta">
		<span>{agente}</span>
		<span>{event?.inicio}</span>
	</div>

	<p class="motivo">{event?.motivo}</p>
</button>

<style>
	button {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		width: 100%;
		border: 1px solid var(--color-muted);
		border-radius: var(--a);
		padding: var(--a);
		cursor: pointer;
		text-align: left;
		height: var(--f);
		backdrop-filter: blur(16px);
	}

	.meta {
		display: flex;
		gap: var(--a);
		font-size: 0.75rem;
		opacity: 0.8;
	}

	.motivo {
		font-size: 0.8rem;
		opacity: 0.9;
	}
</style>
