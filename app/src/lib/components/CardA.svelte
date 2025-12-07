<script lang="ts">
	import { draggable } from "$lib/actions/dnd";
	let {title} = $props();
</script>

<button use:draggable={title}>
	{title}
</button>

<style>
	button {
		background-color: rgba(255, 0, 0, 0.3);
		width: 70vw;
		max-width: var(--h);
		border: 1px solid var(--color-muted);
		border-radius: var(--a);
		padding: var(--a);
		cursor: pointer;
		transition: background-color 0.2s ease;
	}
</style>