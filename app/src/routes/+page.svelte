<script lang="ts">
	import ButtonA from "$lib/components/ButtonA.svelte";
	import CardC from "$lib/components/CardC.svelte";
	import CardD from "$lib/components/CardD.svelte";
	import Calendar from "$lib/components/Calendar.svelte";

</script>
<div class="page-content">
    <div class="details">
        <CardD>
            <p>
                detalles
            </p>
        </CardD>
    </div>
    <div class="actions">
        <ButtonA title="filtro"/>
    </div>
    <div class="calendar">
        <CardC>
            <Calendar/>
        </CardC>
    </div>
</div>

<style>
    .page-content {
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    .calendar {
        flex-grow: 1;
        overflow: hidden;
		min-height: var(--h);
    }

</style>

