<script>
  import Attributes from './Attributes.svelte';
  import { bounceOut } from 'svelte/easing';
  import { createEventDispatcher, onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { initialCollapse } from '../utils/collapse';

  export let hero;

  const EXPAND_HEIGHT = '350px';
  const EXPAND_PADDING = '20px';
  const STATUS_LABEL = '🫀 Status';
  const dispatch = createEventDispatcher();

  let container;

  onMount(() => {
    initialCollapse(container);
  });

  function change() {
    const div = this.nextSibling.nextSibling;
    dispatch('change', { div, height: EXPAND_HEIGHT, padding: EXPAND_PADDING });
  }
</script>

<main>
  <h2 on:click={change}>{STATUS_LABEL}</h2>
  <div class="hero-base background" bind:this={container}>
    <div class="info">
      Name: <br />
      Level {hero.level}
    </div>
    <div class="level">
      {#key hero.xp}
        {hero.xp} xp
        <br />
        <progress
          in:fly={{ x: 5, duration: 200, opacity: 1, easing: bounceOut }}
          class="xp-bar"
          value={hero.xp}
          max="100"
        />
      {/key}
    </div>
    <Attributes {hero} />
  </div>
</main>

<style>
  main {
    width: 270px;
  }

  .background {
    background: url('../interface/papyros_v.png');
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 20px;
    display: flex;
    justify-content: flex-start;
  }

  .hero-base {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: black;
    margin-top: 10px;
    gap: 5px;
    transition: 1s;
    overflow: hidden;
    height: 350px;
    padding: 20px;
  }

  .level {
    display: flex;
  }

  progress {
    width: 100px;
  }
</style>
