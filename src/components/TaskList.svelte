<script>
  import Task from '../components/Task.svelte';
  import { createEventDispatcher } from 'svelte';
  import { enemies } from '../data/enemies';
  import { expandStyleFactory, taskFactory } from '../utils/factories';
  import { PLACEHOLDER_TEXT } from '../utils/constants';

  export let player;

  const dispatch = createEventDispatcher();

  let task = taskFactory();

  $: todoList = [];

  function storeTasks(tasks) {
    todoList = tasks;
    const rt = tasks.values((item) => {
      console.log(item);
      return [item, ...tasks];
    });

    console.log('rt: ', rt);
    return;
    localStorage.setItem('q&t_tdl', todoList.toString());
  }

  function addToList() {
    if (task.text === '') {
      alert('Give it a name!');
      return;
    }
    todoList = [...todoList, task];
    task = taskFactory();
    storeTasks(todoList);
  }

  function removeFromList(index) {
    todoList.splice(index, 1);
    storeTasks(todoList);
  }

  function change() {
    const div = this.nextSibling.nextSibling;
    dispatch('change', expandStyleFactory(div));
  }

  function handleEnemyLevel(enemy) {
    return player.level + 1 >= enemy.level;
  }

  function handleKey(event) {
    if (event.key === 'Enter') addToList();
  }
</script>

<main class="menu-box">
  <h2 class="collapse" on:click={change}>📜 Quests & Tasks!</h2>
  <div class="container">
    <div class="quest-config">
      <p>Task:</p>
      <input
        bind:value={task.text}
        on:keydown={handleKey}
        class="quest-input"
        type="text"
        placeholder={PLACEHOLDER_TEXT}
      />

      <p>Enemy:</p>
      <div class="enemy">
        <select bind:value={task.level}>
          {#each enemies as enemy}
            {#if handleEnemyLevel(enemy)}
              <option value={enemy.level}>{enemy.icon} {enemy.name}</option>
            {/if}
          {/each}
        </select>
        <div class="add-button" on:click={addToList}>⤵️</div>
      </div>
    </div>
    <div class="quest-list">
      {#each todoList as item, index}
        <Task
          id={index}
          task={item}
          on:remove={() => removeFromList(index)}
          on:startBattle={() => dispatch('startBattle', { level: item.level })}
          on:playerHit={() => dispatch('playerHit')}
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
    z-index: 1;
    font-size: 1rem;
    letter-spacing: 3px;
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
    height: 35px;
  }

  .quest-input::placeholder {
    color: black;
  }

  .enemy {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.5rem;
    padding: 0;
    margin: 0;
  }

  select {
    border-radius: 5px;
    background: lightgoldenrodyellow;
  }

  select > option {
    background: green;
  }

  .add-button {
    text-shadow: 1px 2px 5px black;
    cursor: pointer;
    font-size: 2.5rem;
    margin-top: -10px;
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
