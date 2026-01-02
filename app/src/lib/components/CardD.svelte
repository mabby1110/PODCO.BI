<script lang="ts">
	import { selectedEvent } from "$lib/stores/selectedEvent";
	import { slide } from "svelte/transition";

	let { children } = $props();
</script>

<button class="panel" transition:slide onclick={()=>$selectedEvent=null}>
	{#if children}
		{@render children()}
	{:else}
		<p>fallback content</p>
	{/if}
</button>

<style>
	button {
		background-color: var(--color-liquidGlazz);
		width: 100%;
		max-width: var(--j);
		height: var(--h);
		cursor: pointer;
	}
</style>
