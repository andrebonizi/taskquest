<script>
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
  
    export let id;
    export let task;
   
    function removeFromList(index, status){
        dispatch('remove', { index } );
        status ? dispatch('startBattle', { level: task.enemy.level } ) : dispatch('hit');
    }

    function fightButton(checked) {
        return checked ? '💥 Fight!' : '🧨 Drop!';
    }
   
console.log(task, 'TASK')
</script>

<div class="quest">
    <input id="{id}" bind:checked={task.status} type="checkbox">
    <span>
        <p style="--task-color: {task.enemy.taskColor}">LV 
            <span class="level-icon">{task.enemy.level ? task.enemy.level : 1}</span>
        {task.enemy.icon}: 
        </p>
    </span>
    <label for="{id}" class:checked={task.status}>{task.text}</label>
    <span class="fight" on:click={() => removeFromList(id, task.status)}>
        <button>{fightButton(task.status)}</button>
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
        display: inline-block;
        margin-right: 20px;
        text-shadow: 2px 2px 5px grey;
    }
    .quest {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        text-align: left;
        margin: 5px;
        border-bottom: 1px solid rgb(88, 57, 11);
    }
    .level-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: var(--task-color);
        border: 2px solid rgb(4, 50, 27);
        border-radius: 100%;
        width: 16px;
        height: 16px;
    }
    .quest p{
        padding: 0 10px;
        font-weight: 700;
    }
    .quest label{
     display: inline-block;
     flex: 1;
     padding: 0 10px;
    }
    input{
        cursor: pointer;
    }
    button{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        cursor: pointer;
        background-color: rgb(100, 65, 18);
        border: 2px outset rgb(151, 105, 35);
        box-shadow: 1px 1px 2px brown;
        color: sandybrown;
        width: fit-content;
        height: 35px;
    }

</style>