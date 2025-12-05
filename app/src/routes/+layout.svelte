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
    <NavButton title='LOGO'/>
</nav>

<div class="page-container">
	{@render children()}
</div>

<style>
	.nav-container {
		position: fixed;
		right: 0;
		bottom: 0;
		margin: 0 var(--a) var(--a) 0;
	}
</style>