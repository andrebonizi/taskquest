<script>
    import { createEventDispatcher } from 'svelte';
    
	const dispatch = createEventDispatcher();

    let newItem = '';
	
    let todoList = [{text: 'Write my first post', status: true},
                    {text: 'Upload the post to the blog', status: false},
                    {text: 'Publish the post at Facebook', status: false}];
	
	function addToList() {
		todoList = [...todoList, {text: newItem, status: false}];
		newItem = '';
	}
	
	function removeFromList(index) {
		todoList.splice(index, 1)
        todoList = todoList;
        alert('Fight!');
        dispatch('battle', { battle: true} );
    }
</script>

<div class="container">
    <input bind:value={newItem} type="text" placeholder="new todo item..">
    <button on:click={addToList}>Add</button>
    
    <br/>
    <div class="quest-list">
        {#each todoList as item, index}
        <div class="quest">
            <input bind:checked={item.status} type="checkbox">
            <span class:checked={item.status}>{item.text}</span>
            <span class="fight" on:click={() => removeFromList(index)}>⚔</span>
            <br/>
        </div>
        {/each} 
    </div>
</div>

<style> 
	.checked {
        text-decoration: line-through;
    }
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
    .quest {
        text-align: left;
    }
    .fight {
        cursor: pointer;
    }
</style> 