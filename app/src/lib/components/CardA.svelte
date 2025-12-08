<script lang="ts">
	import { draggable } from "$lib/actions/dnd";
	import { appState } from "$lib/stores/appState.svelte";
	
	let { event} = $props();
	let isDndEnabled = $derived($appState.dnd);
</script>

<button use:draggable={{ data: event.title, enabled: isDndEnabled }}>
	{#if event}
		{event.title}
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