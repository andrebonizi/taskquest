<script>
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    
    export let id;
    export let task;

    function removeFromList(index, status){
        dispatch('remove', { index } );
        status ? dispatch('startBattle', { level: task.level } ) : '';
    }

</script>


<div class="quest">
    <input bind:checked={task.status} type="checkbox">
    <span> 💀 {task.level?task.level:1} : </span>
    <span class:checked={task.status}>{task.text}</span>
    <span class="fight" on:click={() => removeFromList(id, task.status)}>
        <button>{task.status? '⚔' : '💣' }</button>
    </span>
    <br/>
</div>

<style>
	.checked {
        text-decoration: line-through;
    }
    .quest {
        text-align: left;
    }
    .fight {
        cursor: pointer;
    }
</style>