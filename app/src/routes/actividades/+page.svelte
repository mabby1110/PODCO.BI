<script lang="ts">
	import ButtonA from '$lib/components/ButtonA.svelte';
	import CardC from '$lib/components/CardC.svelte';
	import CardD from '$lib/components/CardD.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import { appState } from '$lib/stores/appState.svelte';
	import FormModal from '$lib/components/FormModal.svelte';

	let { data } = $props();
	console.log(data);
</script>

<div class="page-content">
	<div class="title">
		<h1>Actividades</h1>
	</div>
	<div class="actions">
		<button onclick={() => appState.toggleDnd()} class="butter">
			Editar: {$appState.dnd ? 'Activado' : 'Desactivado'}
		</button>
		<ButtonA title="filtro" />
		<FormModal />
	</div>
	
	<div class="details">
		<CardD>
			<p>detalles</p>
		</CardD>
	</div>
	<div class="calendar">
		<CardC>
			<Calendar googleEvents={data.actividades_fijas} />
		</CardC>
	</div>
</div>

<style>
	.page-content {
		display: flex;
		flex-direction: column;
		overflow: auto;
		gap: var(--a);
	}
	.title {
		padding: var(--a);
	}
	.title h1 {
		height: var(--d);
	}
	.details {
		display: flex;
		flex-wrap: wrap;
		gap: var(--a);
	}
	.calendar {
		border: 1px solid var(--color-muted);
		border-radius: var(--a);
		flex-grow: 1;
		overflow: hidden;
		min-height: var(--h);
	}
</style>
