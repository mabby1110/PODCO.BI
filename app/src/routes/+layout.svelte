<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import NavButton from '$lib/components/NavButton.svelte';
	import '$lib/global.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="nav-container">
	<NavButton title="LOGO" />
</nav>

<div class="page-container">
	{@render children()}
</div>

<style>
	.nav-container {
		position: fixed;
		left: var(--a);
		top: 0;
		margin: var(--a) var(--a) 0 0;
		z-index: 999;
	}
</style>
