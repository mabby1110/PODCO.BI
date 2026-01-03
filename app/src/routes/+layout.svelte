<script lang="ts">
	import bms from '$lib/assets/bms-logo.svg';
	import FormModal from '$lib/components/FormModal.svelte';
	import NavButton from '$lib/components/NavButton.svelte';
	import '$lib/global.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={bms} />
</svelte:head>

<nav class="nav-container">
	<NavButton title="LOGO" />
</nav>

<div class="page-container">
	{@render children()}
</div>

<FormModal />

<style>
	.nav-container {
		position: fixed;
		left: var(--a);
		top: 0;
		margin: var(--a) var(--a) 0 0;
		z-index: 999;
	}
</style>
