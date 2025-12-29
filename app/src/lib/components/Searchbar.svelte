<script lang="ts">
	interface DataItem {
		[key: string]: string | number | null | undefined;
	}

	let {
		data = [],
		selectedDataItem = $bindable(null) // ← Agrega valor inicial null
	}: {
		data: DataItem[];
		selectedDataItem?: DataItem | null;
	} = $props();

	let keyword = $state('');
	let filteredData = $derived.by(() => {
		const searchTerm = keyword.toLowerCase().trim();
		if (searchTerm === '') {
			return data;
		}

		return data.filter((item) => {
			return Object.values(item).some((value) => {
				if (value === null || value === undefined) return false;
				return String(value).toLowerCase().includes(searchTerm);
			});
		});
	});

	function selectItem(item: DataItem) {
		selectedDataItem = item;
	}
</script>

<div class="container">
	<div class="search-input butter">
		<input type="text" bind:value={keyword} placeholder="Buscar..." />
	</div>
	{#if keyword}
		<div class="results">
			{#each filteredData as item (item.id_cliente)}
				<button type="button" class="search-result" onclick={() => selectItem(item)}>
					{item.razon_social || 'Sin nombre'}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.search-input {
		flex-grow: 1;
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
	.search-result {
		background: none;
		border: 1px solid var(--border-color, #ddd);
		padding: var(--a);
		border-radius: var(--a);
		cursor: pointer;
		text-align: left;
		transition: background 0.2s;
	}
	.search-result:hover {
		background: var(--hover-bg, #f5f5f5);
	}
</style>
