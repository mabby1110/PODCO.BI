<script lang="ts">
	let {title} = $props();
</script>

<button>
	{title}
</button>

<style>
	button {
		background-color: var(--color-primary);
		height: var(--d);
		width: var(--f);
		border: 1px solid var(--color-muted);
		border-radius: var(--a);
		padding: var(--a);
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	button:hover {
		background-color: var(--color-secondary);
	}

	button:active {
		background-color: var(--color-secondary);
	}
</style>