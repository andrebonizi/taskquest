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
    <span> Lvl.{task.level?task.level:1}💀 </span>
    <span class:checked={task.status}>{task.text}</span>
    <span class="fight" on:click={() => removeFromList(id, task.status)}>
        <button>{task.status? '⚔ ' : '💣 ' }</button>
    </span>
    <br/>
</div>

<style>
	.checked {
        text-decoration: line-through;
        color: red;
    }
    .quest {
        text-align: left;
        margin-left: 10px;
    }
    input{
        cursor: pointer;
    }
    button{
        border-radius: 10px;
        cursor: pointer;
    }
</style>