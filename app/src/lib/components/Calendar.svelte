<script lang="ts">
    const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const hoursRangePerDay = { start: 8, end: 20 };
    
    // Generar array de horas
    const hours = $derived(
        Array.from(
            { length: hoursRangePerDay.end - hoursRangePerDay.start },
            (_, i) => hoursRangePerDay.start + i
        )
    );
</script>

<div class="calendar">
    <div class="title">
        Calendario Semanal
    </div>
    <div class="time-grid">
        <table>
            <thead>
                <tr>
                    <th class="corner">Hora</th>
                    {#each weekdays as day}
                        <th>{day}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each hours as hour}
                    <tr>
                        <td class="hour-cell">{hour}:00</td>
                        {#each weekdays as _}
                            <td class="event-cell"></td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    .calendar {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: scroll;
    }
    .title {
        padding: 1rem;
        text-align: start;
    }
    .time-grid {
        flex-grow: 1;
        display: flex;
        width: 100%;
        overflow: auto;
    }
    .time-grid table {
        flex-grow: 1;
        border-collapse: collapse;
        position: relative;
    }
    .time-grid th,
    .time-grid td {
        position: sticky;
        left: 0;
        top: 0;
        background-color: var(--color-primary);
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        gap: 1px;
    }
    .time-grid th {
        padding: 8px;
        position: sticky;
        left: var(--e);
        top: 0;
        z-index: 9;
    }
    .hour-cell {
        position: sticky;
        z-index: 9;
        padding: 8px;
        text-align: center;
        width: var(--i);
        min-width: var(--e);
    }
    .event-cell {
        position: sticky;
        left: var(--i);
        min-width: var(--h);
        min-height: var(--e);
    }
    .time-grid .corner {
        position: sticky;
        z-index: 9999;
        left: 0;
    }
</style>