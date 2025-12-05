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
        display: flex;
        flex-wrap: wrap;
    }
    .details {
        background-color: rgba(255, 255, 0, 0.3);
        flex-grow: 1;
        min-width: var(--h);
    }
    .calendar {
        background-color: rgba(255, 0, 0, 0.3);
        min-width: 60vw;
        flex-grow: 3;
    }

</style>

