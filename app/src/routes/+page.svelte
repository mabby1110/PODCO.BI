<script lang="ts">
	import ButtonA from "$lib/components/ButtonA.svelte";
	import CardA from "$lib/components/CardA.svelte";
	import CardB from "$lib/components/CardB.svelte";
	import CardC from "$lib/components/CardC.svelte";
	import CardD from "$lib/components/CardD.svelte";

</script>
<div class="page-content">
    <div class="details">
        <CardD title='detalles'/>
    </div>
    <div class="calendar">
        <CardC title="calendario"/>
    </div>
</div>

<style>
    .page-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(var(--h), 1fr));
        grid-auto-rows: var(--h);

    }
    .details {
        background-color: rgba(255, 255, 0, 0.3);
        min-height: fit-content;
        grid-column: span 2;
    }
    .calendar {
        background-color: rgba(255, 0, 0, 0.3);
        min-height: fit-content;
        grid-column: span 3;
        grid-row: span 2;
    }
</style>

