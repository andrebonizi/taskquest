<script>
    import { createEventDispatcher } from 'svelte';
    import Task from '../components/Task.svelte';

    export let player;

	const dispatch = createEventDispatcher();
    const enemies = [
        {level: 1, icon:'🐀', name: 'Rat'},
        {level: 2, icon:'🦂', name: 'Scorpion'},
        {level: 3, icon:'🐍', name: 'Snake'},
        {level: 4, icon:'🐆', name: 'Tiger'},
        {level: 5, icon:'🐊', name: 'Crocodille'},
        {level: 6, icon:'👹', name: 'Ogre'},
        {level: 7, icon:'🐉', name: 'Dragon'}
    ];

    let newItem = '';
    let level = 1;
    let todoList = [];

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
        dispatch('startBattle',{ level: event.detail.level, monster: enemies[event.detail.level-1]})
    }
    function playerHit() {
        dispatch('playerHit');
    }
</script>

<div class="container">
    <h1>📜 {player.name}'s quests!</h1><br>
    <div class="quest-config">
        <input bind:value={newItem} class="quest-input" type="text" placeholder="What will you fight for?">
        <p>Enemy:</p>
        <select bind:value={level} class="enemy-select">
            {#each enemies as enemy}
                {#if player.level+2 >= enemy.level}
                    <option value={enemy.level}> {enemy.icon} {enemy.name}</option>
                {/if}
            {/each}
        </select>
        <div class="add-button" on:click={addToList}>Add ➕</div>
    </div>

    <div class="quest-list">
        {#each todoList as item, index}
            <Task
                id={index}
                task={item}
                on:remove={removeFromList}
                on:startBattle={callBattle}
                on:hit={playerHit}
            />
        {/each}
    </div>
</div>

<style>
    h1 {
        color: wheat;
        text-shadow: 2px 2px 5px black;
        font-weight: lighter;
        font-size: 2rem;
        text-align: left;
        padding-left: 30px;
    }
    p{
        color: black;
        display: inline;
        text-shadow: 2px 2px 5px white;
    }
    .container {
        border-radius: 10px;
        margin: 20px;
        padding: 20px;
        background: linear-gradient(brown, rgb(173, 87, 17));
        border: 2px outset rgb(173, 87, 17);
        font-family: 'Lobster';
        font-weight: lighter;
    }
    .quest-config, select{
        display: inline;
    }
    .quest-list {
        width: 99%;
        height: 300px;
        border: 3px inset rgb(173, 87, 17);
        overflow: auto;
        background-color:rgb(167, 119, 56);
    }
    .quest-input{
        background: linear-gradient(whitesmoke, rgb(133, 127, 117));
        color: rgb(0, 0, 0);
        border-radius: 30px;
        padding-left: 20px;
    }
    .quest-input::placeholder{
        color: rgb(43, 38, 38);
    }
    input{
        min-width: 50%;
    }
    .add-button{
        display: inline-block;
        width: fit-content;
        background-color: rgb(122, 89, 58);
        border-radius: 10px;
        box-shadow: 2px 2px 5px black;
        padding-left: 10px;
        text-shadow: 1px 1px 3px black;
        color: whitesmoke;
    }
    .enemy-select{
        border-radius: 30px;
        background: linear-gradient(whitesmoke, rgb(133, 127, 117));
    }
</style>