<script lang="ts">
	import { slide } from 'svelte/transition';

	let { op, cliente, agente } = $props();

	// Placeholders seguros
	const motivo = op?.motivo || "Motivo no definido";
	const inicio = op?.inicio || "Sin fecha";
	const historia = op?.historia || "Sin historial registrado";
	const cotizaciones = op?.cotizaciones || "No hay cotizaciones";
	const documentos = op?.documentos || "Sin documentos";
	const razon = cliente?.razon_social || "Cliente sin nombre";
	const nombreAgente = agente?.nombre || "Agente desconocido";

	let style;
	switch (op?.fase) {
		case '0': style = 'background-color: var(--color-perdida);'; break;
		case '2': style = 'background-color: var(--color-analizar);'; break;
		case '3': style = 'background-color: var(--color-cotizar);'; break;
		case '4': style = 'background-color: var(--color-ganada);'; break;
		case '5': style = 'background-color: var(--color-enviar);'; break;
		case '6': style = 'background-color: var(--color-finalizar); color: white;'; break;
		default: style = 'background-color: var(--color-prospecto);'; break;
	}

	let isExpanded = $state(false);
	function expandCard() {
		isExpanded = !isExpanded;
	}
</script>

<button class="card" {style} onclick={expandCard}>
	<div class="card-title">
		<h2>{motivo}</h2>
	</div>

	<div class="card-brief">
		<p>{inicio}, {razon}</p>
	</div>

	<div class="card-meta">
		<p>{nombreAgente}</p>
	</div>

	{#if isExpanded}
		<div class="card-details" transition:slide>
			<div class="detail-block">
				<span class="label">Historia:</span>
				<p>{historia}</p>
			</div>

			<div class="detail-block">
				<span class="label">Cotizaciones:</span>
				<p>{cotizaciones}</p>
			</div>

			<div class="detail-block">
				<span class="label">Documentos:</span>
				<p>OC, pedido del cliente, guía de paquetería, acuse, fichas técnicas…</p>
				<p>{documentos}</p>
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

	.detail-block {
		display: flex;
		flex-direction: column;
		gap: var(--a);
	}

	.label {
		font-weight: lighter;
		font-size: 20px;
	}
</style>
