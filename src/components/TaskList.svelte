<script>
  import Task from "../components/Task.svelte";
  import { createEventDispatcher } from "svelte";
  import { enemies } from "../data/enemies";

  export let player;

  const dispatch = createEventDispatcher();

  let newItem = "";
  let level = 1;

  $: todoList = [];

  function addToList() {
    todoList = [
      ...todoList,
      {
        text: newItem,
        status: false,
        enemy: enemies[level - 1],
      },
    ];
    newItem = "";
  }

  function removeFromList(event) {
    todoList.splice(event.detail.index, 1);
    todoList = todoList;
  }

  function callBattle(event) {
    dispatch("startBattle", {
      level: event.detail.level,
      monster: enemies[event.detail.level - 1],
    });
  }

  function playerHit() {
    dispatch("playerHit");
  }

  function change() {
    dispatch("change", {
      div: this.nextSibling.nextSibling,
      height: "385px",
      padding: "20px",
    });
  }
</script>

<main>
  <h2 class="collapse" on:click={change}>📜 Quests & Tasks!</h2>
  <div class="container">
    <div class="quest-config">
      <p>Task:</p>
      <input
        bind:value={newItem}
        class="quest-input"
        type="text"
        placeholder="What will you fight for?"
      />

      <p>Enemy:</p>
      <div class="enemy">
        <select bind:value={level}>
          {#each enemies as enemy}
            {#if player.level + 2 >= enemy.level}
              <option value={enemy.level}> {enemy.icon} {enemy.name}</option>
            {/if}
          {/each}
        </select>
        <div class="add-button" on:click={addToList}>➕</div>
      </div>
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
</main>

<style>
  main {
    width: 270px;
  }

  p {
    width: fit-content;
    color: black;
  }

  .container {
    border-radius: 10px;
    padding: 20px;
    border: 2px outset rgb(173, 87, 17);
    font-family: "Lobster";
    font-weight: lighter;
    background: gray;
    display: flex;
    flex-direction: column;
    transition: 1s;
    overflow: hidden;
    height: 385px;
  }

  .quest-config {
    display: flex;
    flex-direction: column;
  }

  .quest-list {
    height: 220px;
    border: 3px inset rgb(173, 87, 17);
    overflow: auto;
    background-color: rgba(235, 235, 235, 0.528);
    width: 100%;
  }

  .quest-input {
    background: lightgoldenrodyellow;
    color: rgb(0, 0, 0);
    border-radius: 5px;
    padding-left: 20px;
    min-width: 50%;
  }

  .quest-input::placeholder {
    color: rgb(43, 38, 38);
  }

  .enemy {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  select {
    border-radius: 5px;
    height: 35px;
    background: lightgoldenrodyellow;
  }

  .add-button {
    display: flex;
    width: fit-content;
    background-color: darkcyan;
    border-radius: 10px;
    box-shadow: 2px 2px 5px black;
    cursor: pointer;
    padding: 5px;
    margin-top: -30px;
    font-size: 1.5rem;
  }

  .add-button:hover {
    scale: 1.1;
  }
</style>
