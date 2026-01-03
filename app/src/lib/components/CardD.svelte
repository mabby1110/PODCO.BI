<script lang="ts">
	let { selectedEvent } = $props();
</script>

<button class="card-d" onclick={()=>$selectedEvent=null}>
	<header>
		<span class="fase">{selectedEvent.fase || 'Sin fase'}</span>
		<span class="duracion">{selectedEvent.duracion}</span>
	</header>

	<section class="grid">
		<div><strong>ID:</strong> {selectedEvent.id}</div>
		<div><strong>Cliente:</strong> {selectedEvent.id_cliente}</div>
		<div><strong>Agente:</strong> {selectedEvent.id_agente}</div>
		<div><strong>Inicio:</strong> {selectedEvent.inicio}</div>
		<div><strong>Fin:</strong> {selectedEvent.fin}</div>
	</section>

	{#if selectedEvent.motivo}
		<p class="motivo">{selectedEvent.motivo}</p>
	{/if}

	<footer>
		{#if selectedEvent.cotizaciones}
			<span>Cotizaciones</span>
		{/if}
		{#if selectedEvent.documentos}
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
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 6px 12px;
		font-size: 0.9rem;
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
