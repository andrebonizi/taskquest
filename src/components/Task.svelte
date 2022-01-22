<script>
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    
    export let id;
    export let task;

    function removeFromList(index, status){
        dispatch('remove', { index } );
        status ? dispatch('startBattle', { level: task.level } ) : dispatch('hit');
    }

</script>


<div class="quest">
    <input id="{id}" bind:checked={task.status} type="checkbox">
    <span> Lvl.{task.level?task.level:1}💀 </span>
    <label for="{id}" class:checked={task.status}>{task.text}</label>
    <span class="fight" on:click={() => removeFromList(id, task.status)}>
        <button>{task.status? '💥 Fight!' : '🧨 Drop!' }</button>
    </span>
    <br/>
</div>

<style>
	.checked {
        text-decoration: line-through;
        color: red;
    }
    label{
        color: black;
    }
    .quest {
        text-align: left;
        margin: 5px;
        border-bottom: 1px solid rgb(88, 57, 11);
    }
    input{
        cursor: pointer;
    }
    button{
        border-radius: 10px;
        cursor: pointer;
        background-color: rgb(100, 65, 18);
        border: 2px outset rgb(151, 105, 35);
        box-shadow: 1px 1px 2px brown;
        color: sandybrown;
        width: fit-content;
        height: 35px;
    }
    label{
        display: inline-block;
        margin-right: 20px;
    }
</style>