<script lang="ts">
	import ButtonA from '$lib/components/ButtonA.svelte';
	import CardC from '$lib/components/CardC.svelte';
	import CardD from '$lib/components/CardD.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import CardB from '$lib/components/CardB.svelte';
	import { appState } from '$lib/stores/appState.svelte';
</script>

<div class="page-content">
	<div class="details">
		<CardD>
			<p>detalles</p>
		</CardD>
		<CardB>
			<button onclick={() => appState.toggleDnd()}>
				Editar: {$appState.dnd ? 'Activado' : 'Desactivado'}
			</button>
		</CardB>
	</div>
	<div class="actions">
		<ButtonA title="filtro" />
	</div>
	<div class="calendar">
		<CardC>
			<Calendar />
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
