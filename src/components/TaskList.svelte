<script>
    import { createEventDispatcher } from 'svelte';
    import Task from '../components/Task.svelte';
    
	const dispatch = createEventDispatcher();

    let newItem = '';
    let level = 1;
    const levels = [
        {'🐀':1},
        {'🐍':2}, 
        {'🐆':3},
        {'👹':4},
        {'🐉':5}
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
    <input bind:value={newItem} type="text" placeholder="Write your quest or task...">
    <select bind:value={level}>
        {#each levels as lvl}
        <option value={lvl[Object.keys(lvl)]}> {Object.keys(lvl)} </option>
        {/each}
	</select>
    <button on:click={addToList}>Add</button>
    
    <br/>
    <div class="quest-list">
        {#each todoList as item, index}
            <Task id={index} task={item} on:remove={removeFromList} on:startBattle={callBattle} />
        {/each} 
    </div>
</div>

<style>
    .container {
        width: 400px;
        border: 1px solid black;
        margin: 20px auto;
    }
    .quest-list {
        width: 280px;
        height: 200px;
        border: 1px dotted gray;
        margin: 10px auto;
        overflow:auto;
    }
</style> 