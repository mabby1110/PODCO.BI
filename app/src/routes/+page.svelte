<script lang="ts">
	import ButtonA from "$lib/components/ButtonA.svelte";
	import CardC from "$lib/components/CardC.svelte";
	import CardD from "$lib/components/CardD.svelte";

</script>
<div class="page-content">
    <div class="details">
        <CardD title='detalles'/>
    </div>
    <div class="actions">
        <ButtonA title="filtro"/>
    </div>
    <div class="calendar">
        <CardC title="calendario"/>
    </div>
</div>

<style>
    .page-content {
        display: flex;
        flex-direction: column;
    }
    .details {
        background-color: rgba(255, 0, 0, 0.3);
    }
    .actions {
        background-color: rgba(34, 0, 255, 0.3);
    }
    .calendar {
        background-color: rgba(255, 0, 0, 0.3);
        flex-grow: 4;
    }

</style>

