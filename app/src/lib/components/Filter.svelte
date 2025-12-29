<script lang="ts">
	interface DataItem {
		[key: string]: string | number | null | undefined;
	}

	let { data = $bindable([]) }: { data: DataItem[] } = $props();
	let keyword = $state('');
	let originalData = $state<DataItem[]>([]);

	// Guardar datos originales al montar
	$effect(() => {
		if (originalData.length === 0 && data.length > 0) {
			originalData = [...data];
		}
	});

	// Filtrar y actualizar data automáticamente
	$effect(() => {
		const searchTerm = keyword.toLowerCase().trim();
		
		if (searchTerm === '') {
			data = originalData;
		} else {
			data = originalData.filter((item) => {
				return Object.values(item).some((value) => {
					if (value === null || value === undefined) return false;
					return String(value).toLowerCase().includes(searchTerm);
				});
			});
		}
	});
</script>

<div class="butter">
	<input 
		type="text" 
		bind:value={keyword} 
		placeholder="Buscar oportunidades..."
	/>
</div>

<style>
	.butter {
		padding: 0;
		overflow: hidden;
	}
	.butter input {
		width: 100%;
		height: 100%;
		border: none;
		border-radius: var(--a);
		padding: 0 var(--a);
	}
</style>