<script lang="ts">
	import ButtonA from '$lib/components/ButtonA.svelte';
	import { appState } from '$lib/stores/appState.svelte';
	import CardB from '$lib/components/CardB.svelte';
	import FMOportunidades from '$lib/components/FMOportunidades.svelte';
	import Filter from '$lib/components/Filter.svelte';

	let { data } = $props();
	let oportunidades = $derived(data.historial_oportunidades_json.map((item) => ({
		...item,
		id_cliente: data.clientes[item.id_cliente].razon_social,
		id_agente: data.agentes[item.id_agente]?.nombre
	})));
	console.log('oportunidades', oportunidades);
</script>

<div class="page-content">
	<div class="title">
		<h1>Actividades</h1>
	</div>

	<div class="actions">
		<Filter bind:oportunidades />
		<FMOportunidades clientes={data.clientes} />
	</div>
	<div class="op-list">
		{#each oportunidades as op}
			<CardB
				{op}
				cliente={data.clientes.find((item) => item.id_cliente === op.id_cliente)}
				agente={data.agentes.find((item) => item.id_agente === op.id_agente)}
				fase={data.fases_embudo_ventas.find((item) => item.id === op.fase)}
			/>
		{/each}
	</div>
</div>

<style>
	.page-content {
		display: flex;
		flex-direction: column;
		overflow: auto;
		gap: var(--b);
	}
	.title {
		padding: var(--a);
	}
	.title h1 {
		height: var(--d);
	}
	.op-list {
		display: flex;
		flex-direction: column;
		gap: var(--b);
	}
	.actions {
		display: flex;
		gap: var(--a);
		flex-wrap: wrap;
	}
</style>
