<script>
  import { createEventDispatcher } from 'svelte';
  import { FIGHT, QUIT } from '../../utils/constants';

  const dispatch = createEventDispatcher();

  export let id;
  export let task;

  function removeFromList(index, done) {
    dispatch('remove', { index });
    done ? dispatch('startBattle') : dispatch('playerHit');
  }

  function fightButton(checked) {
    return checked ? FIGHT : QUIT;
  }
</script>

<div class="quest">
  <input {id} bind:checked={task.done} type="checkbox" />
  <label for={id} class:checked={task.done}>{task.text}</label>
  <span class="fight" on:click={() => removeFromList(id, task.done)}>
    <button>{fightButton(task.done)}</button>
  </span>
  <br />
</div>

<style>
  .checked {
    text-decoration: line-through;
  }
  label {
    user-select: none;
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
    padding: 0 5px;
    border-bottom: 1px solid rgb(88, 57, 11);
  }
  .quest label {
    display: inline-block;
    flex: 1;
    padding: 0 10px;
  }
  input {
    cursor: pointer;
  }

  button {
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
