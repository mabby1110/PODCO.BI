<script lang="ts">
	import { draggable } from "$lib/actions/dnd";
	import { appState } from "$lib/stores/appState.svelte";
	
	let { title, children } = $props();
	let isDndEnabled = $derived($appState.dnd);
</script>

<button use:draggable={{ data: title, enabled: isDndEnabled }}>
	{#if children}
		{@render children()}
	{:else}
		<p>fallback content</p>
	{/if}
</button>

<style>
	button {
		background-color: var(--color-contrast);
		backdrop-filter: blur(16px);
		width: 70vw;
		max-width: var(--h);
		border: 1px solid var(--color-muted);
		border-radius: var(--a);
		padding: var(--a);
		cursor: pointer;
		transition: background-color 0.2s ease;
	}
</style>