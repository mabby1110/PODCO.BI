<script lang="ts">
	import { page } from '$app/state';
	import { filterStore } from '$lib/stores/filterStore.svelte';

	const agentes = $derived(page.data.agentes ?? []);
	// Variable local para el bind - debe ser string para el select
	let selectedAtributo = $state(filterStore.atributo?.toString() ?? '');
	let keyword = $state(filterStore.keyword ?? '');

	// Sincronizar cambios de la variable local al store
	$effect(() => {
		// Convierte a número si no está vacío, sino ''
		filterStore.atributo = selectedAtributo !== '' ? Number(selectedAtributo) : '';
	});

	$effect(() => {
		filterStore.keyword = keyword;
	});
</script>

<div>
	{filterStore.keyword}{filterStore.atributo}
	<select bind:value={selectedAtributo} class="butter">
		<option value="">seleccionar</option>
		{#each agentes as agente}
			{#if agente?.id_agente !== undefined}
				<option value={String(agente.id_agente)}>{agente.nombre}</option>
			{/if}
		{/each}
	</select>

	<!-- <input
		type="text"
		bind:value={keyword}
		placeholder="Buscar oportunidades..."
	/> -->
</div>