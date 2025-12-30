<script lang="ts">
	import { enhance } from '$app/forms';
	import AddAction from './AddAction.svelte';
	import ButtonA from './ButtonA.svelte';
	import Searchbar from './Searchbar.svelte';
	let { clientes } = $props();
	let showModal = $state(false);
	let selectedDataItem = $state(null);
	let showClient = $derived(selectedDataItem?true:false);

	$effect(() => {
		console.log('selectedDataItem', selectedDataItem);
	});

	function clearSelection() {
		selectedDataItem = null;
	}
</script>

<button onclick={() => (showModal = true)} class="butter">Agregar Oportunidad</button>

{#if showModal}
	<div
		class="overlay"
		onclick={() => (showModal = false)}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Escape' && (showModal = false)}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="modal" onclick={(e) => e.stopPropagation()} role="dialog" tabindex="-1">
			<div class="modal-header">
				<h2>Nueva Oportunidad</h2>
				<button class="close" onclick={() => (showModal = false)}>✕</button>
			</div>

			<form method="POST" action="?/addEvent" use:enhance>
				<label>
					<span>Cliente</span>
					<div class="client-section">
						{#if selectedDataItem}
							<!-- Cliente seleccionado -->
							<div class="selected-client">
								<div class="client-info">
									<strong>{selectedDataItem.razon_social || 'Sin nombre'}</strong>
									<span class="client-id">ID: {selectedDataItem.id_cliente}</span>
								</div>
								<button type="button" class="change-btn" onclick={clearSelection}> Cambiar </button>
							</div>
							<!-- Input oculto para enviar el ID en el form -->
							<input type="hidden" name="id_cliente" value={selectedDataItem.id_cliente} />
						{/if}
						<div class='client-section-actions {showClient?'hide':''}'>
							<Searchbar data={clientes} bind:selectedDataItem />
							<AddAction/>
						</div>
					</div>
				</label>

				<label>
					<span>Historia</span>
					<textarea name="historia" rows="3" required></textarea>
				</label>

				<label>
					<span>Análisis</span>
					<textarea name="analisis" rows="3"></textarea>
				</label>

				<label>
					<span>Prioridad</span>
					<select name="prioridad" required>
						<option value="">Seleccionar</option>
						<option value="alta">Alta</option>
						<option value="media">Media</option>
						<option value="baja">Baja</option>
					</select>
				</label>

				<label>
					<span>Notas</span>
					<textarea name="notas" rows="4"></textarea>
				</label>

				<div class="actions">
					<button type="button" onclick={() => (showModal = false)}>Cancelar</button>
					<button type="submit">Guardar</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.hide {
		display: none;
	}
	.client-section-actions {
		display: flex;
		gap: var(--a);
	}
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		padding: 1rem;
	}

	.modal {
		background: white;
		border-radius: 8px;
		max-width: 600px;
		max-height: 90vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		position: relative;
		z-index: 10000;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem;
		border-bottom: 1px solid #e5e5e5;
	}

	.close {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
	}

	.close:hover {
		background: #f5f5f5;
	}

	form {
		padding: 1.5rem;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.client-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.selected-client {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem;
		background: #f0f9ff;
		border: 1px solid #bae6fd;
		border-radius: 4px;
	}

	.client-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.client-id {
		font-size: 0.875rem;
		color: #64748b;
	}

	.change-btn {
		padding: 0.375rem 0.75rem;
		background: white;
		border: 1px solid #cbd5e1;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.875rem;
	}

	.change-btn:hover {
		background: #f8fafc;
	}

	input,
	textarea,
	select {
		padding: 0.5rem;
		border: 1px solid #d1d5db;
		border-radius: 4px;
	}

	input:focus,
	textarea:focus,
	select:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.actions {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
		padding-top: 1rem;
		border-top: 1px solid #e5e5e5;
	}

	.actions button {
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		border: none;
	}

	.actions button[type='button'] {
		background: #f5f5f5;
		color: #374151;
	}

	.actions button[type='submit'] {
		background: #3b82f6;
		color: white;
	}

	.actions button:hover {
		opacity: 0.9;
	}
</style>
