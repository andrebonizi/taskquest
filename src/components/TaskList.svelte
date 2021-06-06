<script>
    import { createEventDispatcher } from 'svelte';
    import Task from '../components/Task.svelte';
    
	const dispatch = createEventDispatcher();

    let newItem = '';
    let level = 1;
    const levels = [
        {'🐀 Rat':1},
        {'🐍 Snake':2}, 
        {'🐆 Tiger':3},
        {'👹 Ogre':4},
        {'🐉 Dragon':5}
    ];
	
    let todoList = [{text: 'First task', status: false}];
	
	function addToList() {
        let task;
        task = {text: newItem, status: false, level: level};
		todoList = [...todoList, task];
		newItem = '';
	}
	
	function removeFromList(event) {
		todoList.splice(event.detail.index, 1)
        todoList = todoList;
    }
    function callBattle(event) {
        dispatch('startBattle',{ level: event.detail.level })
    }
    
</script>

<div class="container">
    <input bind:value={newItem} type="text" placeholder="What will you fight?">
    Monster:
    <select bind:value={level}>
        {#each levels as lvl}
        <option value={lvl[Object.keys(lvl)]}> {Object.keys(lvl)} </option>
        {/each}
	</select>
    <button on:click={addToList}>Add➕</button>
    
    <br/>
    <div class="quest-list">
        {#each todoList as item, index}
            <Task id={index} task={item} on:remove={removeFromList} on:startBattle={callBattle} />
        {/each} 
    </div>
</div>

<style>
    .container {
        width: 100%;
        border: 5px outset whitesmoke;
        border-radius: 10px;
        margin: 20px;
        padding: 20px;
        background-color: lightgray;
    }
    .quest-list {
        width: 99%;
        height: 200px;
        border: 5px inset whitesmoke;
        overflow: auto;
        background-color: whitesmoke;
    }
    input{
        min-width: 50%;
    }
    select{
        font-size: 1.5rem;
    }
</style> 