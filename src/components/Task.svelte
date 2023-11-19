<script>
  import { createEventDispatcher } from "svelte";

  const FIGHT = "💥 Fight!";
  const QUIT = "☠️ Quit!";
  const dispatch = createEventDispatcher();

  export let id;
  export let task;

  function removeFromList(index, done) {
    dispatch("remove", { index });
    done
      ? dispatch("startBattle", { level: task.enemy.level })
      : dispatch("explode");
  }

  function fightButton(checked) {
    return checked ? FIGHT : QUIT;
  }
</script>

<div class="quest">
  <input {id} bind:checked={task.done} type="checkbox" />
  <span>
    <p style="--task-color: {task.enemy.taskColor}">
      LV
      <span class="level-icon">{task.enemy.level ?? 1}</span>
      {task.enemy.icon}:
    </p>
  </span>
  <label for={id} class:checked={task.done}>{task.text}</label>
  <span class="fight" on:click={() => removeFromList(id, task.done)}>
    <button>{fightButton(task.done)}</button>
  </span>
  <br />
</div>

<style>
  .checked {
    text-decoration: line-through;
    color: red;
  }
  label {
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
    margin: 5px;
    padding: 0 15px;
    border-bottom: 1px solid rgb(88, 57, 11);
  }
  .level-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--task-color);
    border: 2px solid rgb(4, 50, 27);
    border-radius: 100%;
    width: 22px;
    height: 22px;
  }
  .quest p {
    padding: 0 10px;
    font-weight: 700;
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
    cursor: pointer;
    transition: 0.5s ease all;
  }
  button:hover {
    scale: 1.1;
  }
</style>
