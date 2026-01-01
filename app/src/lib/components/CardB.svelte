<script lang="ts">
	import { slide } from 'svelte/transition';
	import EditableField from './EditableField.svelte';

	let { op, cliente, agente, fase } = $props();

	// Placeholders seguros
	const motivo = op?.motivo || 'Motivo no definido';
	const inicio = op?.inicio || 'Sin fecha';
	const razon = op?.id_cliente || 'Cliente sin nombre';
	const nombreAgente = op?.id_agente || 'Agente desconocido';

	// Estados editables
	let isExpanded = $state(false);
	let historia = $state(op?.historia || 'Sin historial registrado');
	let cotizaciones = $state(op?.cotizaciones || 'No hay cotizaciones');
	let documentos = $state(op?.documentos || 'Sin documentos');

	let style;
	switch (op?.fase) {
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
			console.log(op);
			break;
	}

	function handleCardClick(e: MouseEvent) {
		// 1. Evitar si el evento fue disparado por un teclado (simulación de clic por Espacio)
		if (e.detail === 0) {
			return;
		}

		// El resto de la lógica de exclusión de elementos:
		if (!(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
			isExpanded = !isExpanded;
		}
	}
</script>

<button class="card" {style} onclick={handleCardClick}>
	<div class="card-title">
		<h2>{motivo}</h2>
	</div>

	<div class="card-brief">
		<p>{inicio}, {razon}</p>
	</div>

	<div class="card-meta">
		<p>{nombreAgente}, {fase?.actual}</p>
	</div>

	{#if isExpanded}
		<div class="card-details" transition:slide>
			<EditableField
				label="Historia"
				name="historia"
				bind:value={historia}
				type="textarea"
				rows={3}
				id={op?.id_oportunidad || ''}
			/>

			<EditableField
				label="Cotizaciones"
				name="cotizaciones"
				bind:value={cotizaciones}
				type="textarea"
				rows={3}
				id={op?.id_oportunidad || ''}
			/>

			<EditableField
				label="Documentos"
				name="documentos"
				bind:value={documentos}
				type="textarea"
				rows={3}
				id={op?.id_oportunidad || ''}
				hint="OC, pedido del cliente, guía de paquetería, acuse, fichas técnicas…"
			/>
			<div class="card-actions">
				<h2>Siguiente fase:</h2>
				<button class="butter">{fase.accion}</button>
				{#if op?.fase == 3}
				<button class="butter">Perdida</button>
				{/if}
			</div>
		</div>
	{/if}
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

	.card-details {
		display: flex;
		flex-direction: column;
		gap: var(--b);
		width: 100%;
	}
	.card-actions {
		margin: var(--b) 0;
		display: flex;
		flex-direction: column;
		gap: var(--a);
	}
	.butter {
		background-color: var(--color-contrast);
		color: white;
	}
</style>
