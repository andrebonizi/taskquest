<script>
  import Attributes from "./Attributes.svelte";
  import { bounceOut } from "svelte/easing";
  import { createEventDispatcher, onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { initialCollapse } from "../utils/collapse";

  export let hero;

  const dispatch = createEventDispatcher();

  let container;

  onMount(() => {
    initialCollapse(container);
  });

  function change() {
    dispatch("change", {
      div: this.nextSibling.nextSibling,
      height: "200px",
      padding: "20px",
    });
  }
</script>

<main>
  <h2 on:click={change}>🫀 Status</h2>
  <div class="hero-base" bind:this={container}>
    Level {hero.level}
    <div class="level">
      {#key hero.xp}
        <progress
          in:fly={{ x: 5, duration: 200, opacity: 1, easing: bounceOut }}
          class="xp-bar"
          value={hero.xp}
          max="100"
        />
        {hero.xp} xp
      {/key}
    </div>
    <Attributes {hero} />
  </div>
</main>

<style>
  main {
    width: 270px;
  }

  .hero-base {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    align-items: center;
    color: black;
    background-color: rgba(255, 255, 255, 0.421);
    margin-top: 10px;
    padding: 20px;
    gap: 5px;
    transition: 1s;
  }

  .level {
    display: flex;
    flex-direction: row;
  }

  progress {
    width: 100px;
  }
</style>
