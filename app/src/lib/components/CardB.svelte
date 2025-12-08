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
		background-color: var(--color-liquidGlazz);
		backdrop-filter: blur(16px);
		flex-grow: 1;
		max-width: var(--j);
		border: 1px solid var(--color-muted);
		border-radius: var(--a);
		padding: var(--a);
		
	}
</style>