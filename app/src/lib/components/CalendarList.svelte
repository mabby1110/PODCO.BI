<script lang="ts">
	import CardB from '$lib/components/CardB.svelte';
	import { filtrarConsecutivo } from '$lib/utils/util';
	import { filterStore } from '$lib/stores/filterStore.svelte';

	let { data } = $props();

	// Lista base SIEMPRE reactiva al cambio de data.actividades
	const oportunidadesOriginal = $derived(
		data?.actividades?.length
			? data.actividades.slice(1).map((row) => ({
					id: row[0],
					id_cliente: row[1],
					id_agente: row[2],
					duracion: row[3],
					inicio: row[4],
					fin: row[5],
					motivo: row[6],
					historia: row[7],
					cotizaciones: row[8],
					documentos: row[9],
					fase: row[10]
			  }))
			: []
	);

	// Lista filtrada reactiva al store
	const oportunidades = $derived(
		filterStore.atributo !== ''
			? filtrarConsecutivo(
					filterStore.atributo,
					'id_agente',
					oportunidadesOriginal
			  )
			: oportunidadesOriginal
	);
</script>

<div class="calentar-list-container">
	<div class="op-list">
		{#each oportunidades as event (event.id)}
			<CardB {event} />
		{/each}
	</div>
</div>

<style>
	.calentar-list-container {
		display: flex;
		flex-direction: column;
		overflow: auto;
		gap: var(--b);
		width: 100%;
	}

	.op-list {
		display: flex;
		flex-direction: column;
		gap: var(--b);
	}
</style>
