<script lang="ts">
	import { slide } from 'svelte/transition';

	let { title } = $props();
	let expanded = $state(true);
</script>

<button onclick={() => (expanded = !expanded)}>
	{#if expanded}
		<div class="nav-links" transition:slide={{ axis: 'x' }}>
			<a href="#">link a</a>
			<a href="#">link b</a>
		</div>
	{/if}
	<div class="logo">
		{title}
	</div>
</button>

<style>
	.nav-links {
		margin-right: var(--b);
		display: flex;
		gap: var(--a);
	}
	.nav-links a {
		min-width: var(--d);
	}
	button {
		background-color: var(--color-primary);
		height: var(--e);
		border: 1px solid var(--color-muted);
		border-radius: var(--a);
		padding: var(--a);
		cursor: pointer;
		display: flex;
		align-items: center;
        float: right;
	}

	button:hover {
		background-color: var(--color-secondary);
	}

	button:active {
		background-color: var(--color-secondary);
	}
</style>
