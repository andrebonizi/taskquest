<script>
  import Attributes from './Attributes.svelte';
  import { bounceOut } from 'svelte/easing';
  import { createEventDispatcher, onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { initialCollapse } from '../utils/collapse';

  export let hero;

  const EXPAND_HEIGHT = '200px';
  const EXPAND_PADDING = '30px';
  const STATUS_LABEL = ' Status';
  const dispatch = createEventDispatcher();

  let container;

  onMount(() => {
    initialCollapse(container);
  });

  function getFaceIcon(life) {
    if (life < 0 || life > 10) return null;
    if (life < 2) return '😰';
    if (life < 5) return '😬';
    if (life < 8) return '😅';
    if (life < 11) return '🙂';
  }

  function change() {
    const div = this.nextSibling.nextSibling;
    dispatch('change', { div, height: EXPAND_HEIGHT, padding: EXPAND_PADDING });
  }
</script>

<main class="menu-box">
  <h2 on:click={change}>{getFaceIcon(hero.life)}{STATUS_LABEL}</h2>
  <div class="hero-base" bind:this={container}>
    <div class="info">
      Level {hero.level}
      <div class="level">
        {#key hero.xp}
          Exp: {hero.xp}
          <progress
            in:fly={{ x: 5, duration: 200, opacity: 1, easing: bounceOut }}
            class="xp-bar"
            value={hero.xp}
            max="100"
          />
        {/key}
      </div>
    </div>
    <Attributes {hero} />
  </div>
</main>

<style>
  .menu-box {
    display: flex;
    flex-direction: column;
    width: fit-content;
    padding: 0;
    border-radius: 10px;
    font-size: 2rem;
  }

  .hero-base {
    display: flex;
    background-color: transparent;
    filter: drop-shadow(3px 3px 6px white);
    border: 1px solid black;
    border-radius: 25px;
    flex-direction: row;
    align-items: flex-start;
    color: black;
    margin-top: 10px;
    gap: 100px;
    transition: 1s;
    overflow: hidden;
    padding: 20px;
  }

  .level {
    display: flex;
  }

  progress {
    width: 100px;
    margin-left: 30px;
  }
</style>
