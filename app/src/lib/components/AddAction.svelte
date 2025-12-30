<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';

	let showForm = $state(false);
	let formData = $state({
		campo1: '',
		campo2: '',
		campo3: ''
	});
</script>

<button onclick={() => (showForm = !showForm)} class="butter">
	{showForm ? '✕' : 'Nuevo +'}
</button>

{#if showForm}
	<div class="form-container">
		<form
			method="POST"
			action="/api/agregar"
			use:enhance={() => {
				return async ({ result }) => {
					await invalidate('clientes');
					showForm = false;
					formData = { campo1: '', campo2: '', campo3: '' };
				};
			}}
		>
			<input
				type="text"
				name="campo1"
				bind:value={formData.campo1}
				placeholder="Campo 1"
				required
			/>
			<input
				type="text"
				name="campo2"
				bind:value={formData.campo2}
				placeholder="Campo 2"
				required
			/>
			<input
				type="text"
				name="campo3"
				bind:value={formData.campo3}
				placeholder="Campo 3"
				required
			/>
			<button type="submit">Enviar</button>
		</form>
	</div>
{/if}
