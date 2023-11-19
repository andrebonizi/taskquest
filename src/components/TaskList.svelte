<script>
  import Task from "../components/Task.svelte";
  import { createEventDispatcher } from "svelte";
  import { enemies } from "../data/enemies";

  export let player;

  const PLACEHOLDER_TEXT = "What will you fight for?";
  const EXPAND_HEIGHT = "385px";
  const EXPAND_PADDING = "20px";
  const dispatch = createEventDispatcher();

  let taskInput = "";
  let taskLevel = 1;

  $: todoList = [];

  function taskFactory() {
    return { text: taskInput, done: false, enemy: enemies[taskLevel - 1] };
  }

  function addToList() {
    todoList = [...todoList, taskFactory()];
    taskInput = "";
  }

  function removeFromList(event) {
    todoList.splice(event.detail.index, 1);
    todoList = todoList;
  }

  function enemyFactory(level) {
    return { level, monster: enemies[level - 1] };
  }

  function callBattle(event) {
    dispatch("startBattle", enemyFactory(event.detail.level));
  }

  function playerHit() {
    dispatch("playerHit");
  }

  function change() {
    const div = this.nextSibling.nextSibling;
    dispatch("change", { div, height: EXPAND_HEIGHT, padding: EXPAND_PADDING });
  }

  function handleEnemy(enemy) {
    return player.level + 2 >= enemy.level;
  }
</script>

<main>
  <h2 class="collapse" on:click={change}>📜 Quests & Tasks!</h2>
  <div class="container">
    <div class="quest-config">
      <p>Task:</p>
      <input
        bind:value={taskInput}
        class="quest-input"
        type="text"
        placeholder={PLACEHOLDER_TEXT}
      />

      <p>Enemy:</p>
      <div class="enemy">
        <select bind:value={taskLevel}>
          {#each enemies as enemy}
            {#if handleEnemy(enemy)}
              <option value={enemy.level}>{enemy.icon} {enemy.name}</option>
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
  @media screen and (min-width: 1024px) {
    main {
      width: 800px;
    }
  }

  p {
    width: fit-content;
    color: lightgoldenrodyellow;
    text-shadow: 2px 2px 5px black;
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
    background: url("../interface/papyros_v.png");
    background-size: cover;
    background-position-x: center;
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
    height: fit-content;
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
