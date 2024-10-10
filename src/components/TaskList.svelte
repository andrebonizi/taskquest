<script>
  import Task from '../components/Task.svelte';
  import { createEventDispatcher } from 'svelte';
  import { enemies } from '../data/enemies';
  import {
    EXPAND_HEIGHT,
    EXPAND_PADDING,
    PLACEHOLDER_TEXT,
  } from '../utils/constants';

  export let player;

  const dispatch = createEventDispatcher();

  let taskInput = '';
  let taskLevel = 1;

  $: todoList = [];

  function taskFactory() {
    return { text: taskInput, done: false, enemy: enemies[taskLevel - 1] };
  }

  function addToList() {
    todoList = [...todoList, taskFactory()];
    taskInput = '';
  }

  function removeFromList(event) {
    todoList.splice(event.detail.index, 1);
    todoList = todoList;
  }

  function enemyFactory(level) {
    return { level, monster: enemies[level - 1] };
  }

  function callBattle(event) {
    dispatch('startBattle', enemyFactory(event.detail.level));
  }

  function playerHit() {
    dispatch('playerHit');
  }

  function change() {
    const div = this.nextSibling.nextSibling;
    dispatch('change', { div, height: EXPAND_HEIGHT, padding: EXPAND_PADDING });
  }

  function handleEnemyLevel(enemy) {
    return player.level + 2 >= enemy.level;
  }

  function handleKey(event) {
    if (event.key === 'Enter') addToList();
  }

  function handleFocus() {
    navigator.virtualKeyboard.show();
  }

  function handleBlur() {
    navigator.virtualKeyboard.hide();
  }
</script>

<main class="menu-box">
  <h2 class="collapse" on:click={change}>📜 Quests & Tasks!</h2>
  <div class="container">
    <div class="quest-config">
      <p>Task:</p>
      <input
        bind:value={taskInput}
        on:keydown={handleKey}
        on:focus={handleFocus}
        on:blur={handleBlur}
        class="quest-input"
        type="text"
        placeholder={PLACEHOLDER_TEXT}
      />

      <p>Enemy:</p>
      <div class="enemy">
        <select bind:value={taskLevel}>
          {#each enemies as enemy}
            {#if handleEnemyLevel(enemy)}
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
          on:playerHit={playerHit}
        />
      {/each}
    </div>
  </div>
</main>

<style>
  @media screen and (min-width: 1024px) {
    main {
      width: 800px;
    }
  }

  p {
    width: fit-content;
    color: lightblue;
    text-shadow: 2px 2px 5px black;
    margin-right: -10px;
    z-index: 5;
    font-size: 1.5rem;
  }

  .container {
    border-radius: 10px;
    padding: 20px;
    border: 2px outset rgb(173, 87, 17);
    font-family: 'Lobster';
    font-weight: lighter;
    background: gray;
    display: flex;
    flex-direction: column;
    transition: 1s;
    overflow: hidden;
    height: 400px;
  }

  .quest-config {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .quest-list {
    background: url('../interface/papyrus_h.png');
    background-size: cover;
    background-position-x: center;
    height: 100%;
    border: 3px inset rgb(173, 87, 17);
    overflow: auto;
    background-color: rgba(235, 235, 235, 0.528);
    width: 100%;
    padding: 40px;
  }

  .quest-input {
    background: lightgoldenrodyellow;
    color: rgb(0, 0, 0);
    border-radius: 5px;
    min-width: 50%;
  }

  .quest-input::placeholder {
    color: black;
  }

  .enemy {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
    padding: 0;
    margin: 0;
  }

  select {
    border-radius: 5px;
    background: lightgoldenrodyellow;
  }

  .add-button {
    display: flex;
    width: fit-content;
    background: linear-gradient(
      rgba(165, 42, 42, 0.773),
      rgba(173, 87, 17, 0.838)
    );
    border-radius: 10px;
    box-shadow: 2px 2px 5px black;
    cursor: pointer;
    padding: 5px;
    margin-top: -30px;
    margin-left: 30px;
    font-size: 1.5rem;
  }

  .add-button:hover {
    scale: 1.1;
  }
  @media screen and (max-width: 800px) {
    .quest-config {
      flex-direction: column;
    }

    .quest-list {
      padding: 10px;
    }
  }
</style>
