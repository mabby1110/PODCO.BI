<script lang="ts">
	let { op, cliente, agente } = $props();
	let style;
	switch (op.fase) {
		case '0':
			style = "background-color: var(--color-perdida);";
			break;
		case '2':
			style = "background-color: var(--color-analizar)";
			break;
		case '3':
			style = "background-color: var(--color-cotizar)";
			break;
		case '4':
			style = "background-color: var(--color-ganada)";
			break;
		case '5':
			style = "background-color: var(--color-enviar);";
			break;
		case '6':
			style = "background-color: var(--color-finalizar);color: white;";
			break;
		default:
			style = "background-color: var(--color-prospecto)";
			break;
	}
</script>

<div class="panel" {style}>
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
		flex-grow: 1;
		align-items: center;
		margin-bottom: var(--b);
	}
	.meta {
		position: absolute;
		right: var(--a);
		bottom: var(--a);
	}
</style>
