<script lang="ts">
	let { op, cliente, agente } = $props();
</script>

<div class="panel">
	<div class="title">
		<h2>{op.motivo}</h2>
	</div>
	<div class="details">
		<p>{op.inicio}, {cliente.razon_social}</p>
	</div>
	<div class="meta">
		<p>{agente.nombre}</p>
	</div>
</div>

<style>
	.panel {
		position: relative;
		background-color: var(--color-prospecto);
		backdrop-filter: blur(16px);
		width: 100%;
		max-width: var(--j);
		min-height: var(--f);
		display: flex;
		flex-direction: column;

	}
	.title {
		min-width: var(-g);
		white-space: nowrap;
		max-height: var(--d);
		overflow: auto;
	}
	.details {
		min-width: var(-g);
		display: flex;
		margin-bottom: var(--b);
	}
	.meta {
		position: absolute;
		right: var(--a);
		bottom: var(--a);
	}
</style>
