<script lang="ts">
	interface DataItem {
		[key: string]: string | number | null | undefined;
	}

	let { oportunidades = [] }: { oportunidades: DataItem[] } = $props();
	let keyword = $state('');

	let filteredData = $derived.by(() => {
		const searchTerm = keyword.toLowerCase().trim();

		if (searchTerm === '') {
			return oportunidades;
		}

		return oportunidades.filter((item) => {
			return Object.values(item).some((value) => {
				if (value === null || value === undefined) return false;
				return String(value).toLowerCase().includes(searchTerm);
			});
		});
	});
</script>

<div class="search-input butter">
	<input type="text" bind:value={keyword} placeholder="Buscar oportunidades..." />
</div>
{#if keyword}
	<div class="results">
		{#each filteredData as item (item.id_cliente)}
			<div class="search-result">
				{item.razon_social || 'Sin nombre'}
			</div>
		{/each}
	</div>
{/if}

<style>
	.search-input {
		padding: 0;
		overflow: hidden;
	}
	.search-input input {
		width: 100%;
		height: 100%;
		border: none;
		border-radius: var(--a);
		padding: 0 var(--a);
	}
	.results {
		padding: var(--a);
		display: flex;
		flex-direction: column;
		gap: var(--a);
		max-height: var(--g);
		overflow: auto;
	}
</style>