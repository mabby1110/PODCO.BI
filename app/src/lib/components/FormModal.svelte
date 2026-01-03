<script lang="ts">
	import { enhance } from '$app/forms';
	import { appState } from '$lib/stores/appState.svelte';
</script>

{#if $appState.addModal}
	<div 
		class="overlay" 
		onclick={() => appState.toggleAddModal()}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Escape' && (appState.toggleAddModal())}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div 
			class="modal" 
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			tabindex="-1"
		>
		<div class="modal-header">
				<h2>Nuevo Evento</h2>
				<button class="close" onclick={() => appState.toggleAddModal()}>✕</button>
			</div>
			
			<form method="POST" action="?/addEvent" use:enhance>
				<label>
					<span>ID</span>
					<input type="text" name="id" required />
				</label>
				
				<label>
					<span>Actividad</span>
					<input type="text" name="actividad" required />
				</label>
				
				<label>
					<span>Descripción</span>
					<textarea name="descripcion" rows="3" required></textarea>
				</label>
				
				<label>
					<span>Documentación</span>
					<textarea name="documentacion" rows="3"></textarea>
				</label>
				
				<label>
					<span>Mantenimiento</span>
					<textarea name="mantenimiento" rows="3"></textarea>
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
					<span>Propietario</span>
					<input type="text" name="propietario" required />
				</label>
				
				<label>
					<span>Estado</span>
					<select name="estado" required>
						<option value="">Seleccionar</option>
						<option value="pendiente">Pendiente</option>
						<option value="en_progreso">En Progreso</option>
						<option value="completado">Completado</option>
					</select>
				</label>
				
				<label>
					<span>Inicio</span>
					<input type="date" name="inicio" required />
				</label>
				
				<label>
					<span>Fin</span>
					<input type="date" name="fin" required />
				</label>
				
				<label>
					<span>Archivos Relacionados</span>
					<input type="text" name="archivos_relacionados" placeholder="URLs separadas por comas" />
				</label>
				
				<label>
					<span>Notas</span>
					<textarea name="notas" rows="4"></textarea>
				</label>
				
				<div class="actions">
					<button type="button" onclick={() => appState.toggleAddModal()}>Cancelar</button>
					<button type="submit">Guardar</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
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
	
	input, textarea, select {
		padding: 0.5rem;
		border: 1px solid #d1d5db;
		border-radius: 4px;
	}
	
	input:focus, textarea:focus, select:focus {
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
	
	.actions button[type="button"] {
		background: #f5f5f5;
		color: #374151;
	}
	
	.actions button[type="submit"] {
		background: #3b82f6;
		color: white;
	}
	
	.actions button:hover {
		opacity: 0.9;
	}
</style>