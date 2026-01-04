<script lang="ts">
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import EditableField from './EditableField.svelte';
	import { selectedEvent } from '$lib/stores/selectedEvent';

	let { event } = $props();

	// Placeholders seguros
	const motivo = event?.motivo || 'Motivo no definido';
	const inicio = event?.inicio || 'Sin fecha';
	const { clientes, agentes, fases_embudo_ventas } = $derived(page.data);
	const razon_social = clientes[event.id_cliente]?.razon_social ?? '';
	const agente = agentes.find((e) => e.id_agente == event.id_agente).nombre ?? '';
	const fase = fases_embudo_ventas[event?.fase].actual;

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
			console.log(event);
			break;
	}

	function select() {
		selectedEvent.set(event);
	}
</script>

<button class="card" {style} onclick={select}>
	<div class="card-title">
		<h2>{motivo}</h2>
	</div>

	<div class="card-brief">
		<p>{inicio}, {razon_social}</p>
	</div>

	<div class="card-meta">
		<p>{agente}, {fase}</p>
	</div>
</button>

<style>
	.card {
		position: relative;
		backdrop-filter: blur(16px);
		width: 100%;
		max-width: var(--j);
		min-height: var(--f);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		border-style: none;
		border-radius: var(--a);
		padding: var(--b);
		box-shadow: 0 8px 6px rgba(0, 0, 0, 0.2);
		text-align: left;
	}

	.card-title h2 {
		max-height: var(--d);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: var(--c);
		font-weight: bold;
	}

	.card-brief {
		margin-top: var(--a);
		margin-bottom: var(--b);
	}

	.card-meta {
		position: absolute;
		right: var(--a);
		bottom: var(--a);
		opacity: 0.8;
	}
</style>
