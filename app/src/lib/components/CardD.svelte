<script lang="ts">
	import { page } from '$app/state';
	import { selectedEvent } from '$lib/stores/selectedEvent';
	import { slide } from 'svelte/transition';
	import DelAction from './DelAction.svelte';
	import EditableField from './EditableField.svelte';
	import { appState } from '$lib/stores/appState.svelte';

	const { clientes, agentes, fases_embudo_ventas } = $derived(page.data);
	const razon_social = clientes[$selectedEvent?.id_cliente]?.razon_social ?? '';
	const agente = agentes.find((e) => e.id_agente == $selectedEvent?.id_agente).nombre ?? '';
	const fase = fases_embudo_ventas[$selectedEvent?.fase].actual;
	let historia = $state($selectedEvent?.historia || 'Sin historial registrado');
	let cotizaciones = $state($selectedEvent?.cotizaciones || 'No hay cotizaciones');
	let documentos = $state($selectedEvent?.documentos || 'Sin documentos');
	let style = $derived.by(() => {
		const colorMap = {
			'0': 'background-color: var(--color-perdida);',
			'2': 'background-color: var(--color-analizar);',
			'3': 'background-color: var(--color-cotizar);',
			'4': 'background-color: var(--color-ganada);',
			'5': 'background-color: var(--color-enviar);',
			'6': 'background-color: var(--color-finalizar); color: white;'
		};
		return colorMap[$selectedEvent?.fase] || 'background-color: var(--color-prospecto);';
	});
	function closeCard(e: MouseEvent) {
		e.stopPropagation();
		$selectedEvent = null;
		appState.setPageActions(true);
	}
</script>

<div class="card-d" transition:slide>
	<header>
		<h2>{$selectedEvent?.motivo}</h2>
		<button class="close-btn" onclick={closeCard} aria-label="Cerrar">✕</button>
	</header>
	<div class="info-line">
		<h3>{agente} {fase}</h3>
	</div>
	<section class="grid">
		<h3>{razon_social}</h3>
		<div><strong>Inicio:</strong> {$selectedEvent?.inicio}</div>
		<div><strong>Fin:</strong> {$selectedEvent?.fin}</div>
		<EditableField
			label="Historia"
			name="historia"
			bind:value={historia}
			type="textarea"
			rows={3}
			id={$selectedEvent?.historia || ''}
		/>

		<EditableField
			label="Cotizaciones"
			name="cotizaciones"
			bind:value={cotizaciones}
			type="textarea"
			rows={3}
			id={$selectedEvent?.id_oportunidad || ''}
		/>

		<EditableField
			label="Documentos"
			name="documentos"
			bind:value={documentos}
			type="textarea"
			rows={3}
			id={$selectedEvent?.id_oportunidad || ''}
			hint="OC, pedido del cliente, guía de paquetería, acuse, fichas técnicas…"
		/>
		<div class="card-actions">
			<h2>Siguiente fase:</h2>
			<button class="butter">{fase.accion}</button>
			{#if $selectedEvent?.fase == 3}
				<button class="butter">Perdida</button>
			{/if}
		</div>
	</section>
	{#if $selectedEvent?.motivo}
		<p class="motivo">{$selectedEvent?.motivo}</p>
	{/if}
	<footer>
		{#if $selectedEvent?.cotizaciones}
			<span>Cotizaciones</span>
		{/if}
		{#if $selectedEvent?.documentos}
			<span>Documentos</span>
		{/if}
		<DelAction />
	</footer>
</div>

<style>
	.card-d {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 14px;
		border-radius: 12px;
		border: 1px solid var(--color-secondary);
		width: 100%;
		max-height: 40vh;
		overflow: auto;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
	.close-btn {
		background: transparent;
		border: none;
		line-height: 1;
		padding: 0;
		cursor: pointer;
		opacity: 0.6;
		transition: opacity 0.2s;
		flex-shrink: 0;
	}
	.close-btn:hover {
		opacity: 1;
	}
	.info-line {
		opacity: 0.85;
	}
	.grid {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--a);
	}
	.grid h3 {
		text-align: left;
	}
	.motivo {
		opacity: 0.85;
	}
	footer {
		display: flex;
		gap: 12px;
		opacity: 0.6;
	}
	@media (max-width: 640px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
