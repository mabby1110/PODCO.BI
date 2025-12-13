<script lang="ts">
	import ButtonA from '$lib/components/ButtonA.svelte';
	import { appState } from '$lib/stores/appState.svelte';
	import CardB from '$lib/components/CardB.svelte';
	import FMOportunidades from '$lib/components/FMOportunidades.svelte';

	let { data } = $props();
	console.log(data.fases_embudo_ventas);
</script>

<div class="page-content">
	<div class="title">
		<h1>Actividades</h1>
	</div>

	<div class="actions">
		<ButtonA title="filtro" />
		<FMOportunidades />
	</div>
	<div class="op-list">
		{#each data.historial_oportunidades_json as op}
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
