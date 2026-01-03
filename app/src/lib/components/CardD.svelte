<script lang="ts">
	import { page } from "$app/state";
	import { selectedEvent } from "$lib/stores/selectedEvent";
	const { clientes, agentes, fases_embudo_ventas } = $derived(page.data);
	const razon_social = clientes[$selectedEvent?.id_cliente]?.razon_social ?? '';
	const agente = agentes.find((e) => e.id_agente == $selectedEvent?.id_agente).nombre ?? '';
	const fase = fases_embudo_ventas[$selectedEvent?.fase].actual;
</script>

<button class="card-d" onclick={()=>$selectedEvent=null}>
	<header>
		<h2>{$selectedEvent?.motivo}</h2>
		<h3>{agente} {fase}</h3>
	</header>
	
	<section class="grid">
		<h3>{razon_social}</h3>
		<div><strong>Inicio:</strong> {$selectedEvent?.inicio}</div>
		<div><strong>Fin:</strong> {$selectedEvent?.fin}</div>
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
	</footer>
</button>

<style>
	.card-d {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 14px;
		border-radius: 12px;
		border: 1px solid var(--color-secondary);
		width: 100%;
	}

	header {
		display: flex;
		justify-content: space-between;
		font-size: 0.85rem;
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
		font-size: 0.85rem;
		opacity: 0.85;
	}

	footer {
		display: flex;
		gap: 12px;
		font-size: 0.75rem;
		opacity: 0.6;
	}

	@media (max-width: 640px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
