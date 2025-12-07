<script lang="ts">
	let { children } = $props();
</script>

<button>
	{#if children}
		{@render children()}
	{:else}
		<p>fallback content</p>
	{/if}
</button>

<style>
	button {
		background-color: var(--color-primary);
		width: 100%;
		height: 100%;
		min-height: var(--h);
		max-width: 100vw;
		max-height: 100vh;
		border: 1px solid var(--color-muted);
		border-radius: var(--a);
		padding: var(--a);
		cursor: pointer;
		transition: background-color 0.2s ease;
	}
</style>