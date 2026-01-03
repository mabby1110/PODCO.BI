<script lang="ts">
	import CardB from '$lib/components/CardB.svelte';
	import FMOportunidades from '$lib/components/FMOportunidades.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import { filtrarConsecutivo } from '$lib/utils/util';
	import { filterStore } from '$lib/stores/filterStore.svelte';

	let { data } = $props();

	const [headers, ...rows] = data.actividades;
	
	// Datos originales sin filtrar
	const oportunidadesOriginal = $state(
		rows.map((row) => ({
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
	);

	// Lista filtrada derivada reactivamente
	const oportunidades = $derived(
		filterStore.atributo !== ''
			? filtrarConsecutivo(filterStore.atributo, 'id_agente', oportunidadesOriginal)
			: oportunidadesOriginal
	);

	$effect(() => {
		console.log('filterStore en lista: ', filterStore.atributo !== '', filterStore.atributo);
		console.log('oportunidades list: ', oportunidades.length);
	});
</script>

<div class="calentar-list-container">
	<div class="op-list">
		{#each oportunidades as event}
			<CardB
				{event}
			/>
		{/each}
	</div>
</div>

<style>
	.calentar-list-container {
		display: flex;
		flex-direction: column;
		overflow: auto;
		gap: var(--b);
	}
	.op-list {
		display: flex;
		flex-direction: column;
		gap: var(--b);
	}
</style>