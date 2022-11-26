<script>
    import { createEventDispatcher } from 'svelte';
    import Task from '../components/Task.svelte';

    export let player;

	const dispatch = createEventDispatcher();
    const enemies = [
        {level: 1, icon:'🐀', name: 'Rat', taskColor: "rgb(148, 231, 25)"},
        {level: 2, icon:'🦂', name: 'Scorpion', taskColor: "rgb(11, 117, 9)"},
        {level: 3, icon:'🐍', name: 'Snake', taskColor: "rgb(197, 164, 43)"},
        {level: 4, icon:'🐆', name: 'Tiger', taskColor: "rgb(125, 51, 31)"},
        {level: 5, icon:'🐊', name: 'Crocodille', taskColor: "rgb(219, 1, 1)"},
        {level: 6, icon:'👹', name: 'Ogre', taskColor: "rgb(255, 0, 0)"},
        {level: 7, icon:'🐉', name: 'Dragon', taskColor: "rgb(63, 2, 113)"}
    ];

    let newItem = '';
    let level = 1;
    let todoList = [];

	function addToList() {
   
        let task;
        task = {text: newItem, status: false, enemy: enemies[level-1] };
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
    <h1>Welcome to the guild, {player.name} </h1>
    <h2>📜 Check out your quests! 🪓 </h2><br>
    <div class="quest-config">
        <p>🏹 Task:</p>
        <input bind:value={newItem} class="quest-input" type="text" placeholder="What will you fight for?">
        <br>
        <p>⚔️ Enemy:</p>
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
    h1{
        text-align: center;
        color: rgb(0, 0, 0);
        font-size: 2.5rem;
     
	
    }
    h2 {
        color: rgb(156, 112, 29);
        text-shadow: 2px 2px 5px black;
        font-weight: lighter;
        font-size: 2rem;
        text-align: center;
        border-radius: 30px;
        padding: 15px;
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
        background: linear-gradient(rgba(165, 42, 42, 0.773), rgba(173, 87, 17, 0.838));
        border: 2px outset rgb(173, 87, 17);
        font-family: 'Lobster';
        font-weight: lighter;
        flex: 1;
        
        
    }
 
    .quest-config, select{
        display: inline;
    }
    .quest-list {
        width: 99%;
        height: 300px;
        border: 3px inset rgb(173, 87, 17);
        overflow: auto;
        background-color:rgba(235, 235, 235, 0.528);
 
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
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 35px;
        padding: 0 10px;
        width: fit-content;
        background-color: rgb(122, 89, 58);
        border-radius: 10px;
        box-shadow: 2px 2px 5px black;
        text-shadow: 1px 1px 3px black;
        color: whitesmoke;
        cursor: pointer;
        transition: 0.5s ease all
    }
    .add-button:hover{
      scale: 1.1;
    }
    .enemy-select{
        margin-right: 10px;
        border-radius: 30px;
        background: linear-gradient(whitesmoke, rgb(133, 127, 117));
    }
    .enemy-select option{
        padding-right: 5px;
        border-radius: 30px;
        background: linear-gradient(whitesmoke, rgb(133, 127, 117));
    }
</style>