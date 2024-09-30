<script>
  import { createEventDispatcher } from 'svelte';
  import { getFaceIcon } from '../data/icons';
  import {
    EXPAND_HEIGHT,
    EXPAND_PADDING,
    STATUS_LABEL,
  } from '../utils/constants';

  export let hero;

  const dispatch = createEventDispatcher();

  let container;

  function change() {
    const div = this.nextSibling.nextSibling;
    dispatch('change', { div, height: EXPAND_HEIGHT, padding: EXPAND_PADDING });
  }
</script>

<main class="menu-box">
  <h2 on:click={change}>{getFaceIcon(hero.life)}{STATUS_LABEL}</h2>
  <div class="hero-base" bind:this={container}>
    <div class="atributes">
      <div>
        ♠︎Attack:{#key hero.power}{hero.power}{/key}
      </div>
      <div>
        ♦︎Defense:{#key hero.guard}{hero.guard}{/key}
      </div>
      <div>
        ♣︎Speed:{#key hero.speed}{hero.speed}{/key}
      </div>
    </div>
  </div>
</main>

<style>
  .menu-box {
    display: flex;
    flex-direction: column;
    width: max-content;
    padding: 0;
    border-radius: 10px;
    font-size: 2rem;
  }
  .hero-base {
    display: flex;
    background: linear-gradient(white, burlywood);
    filter: drop-shadow(3px 5px 6px black);
    border: 1px solid black;
    border-radius: 25px;
    flex-direction: row;
    align-items: flex-start;
    color: black;
    margin: 10px;
    gap: 50px;
    transition: 1s;
    overflow: hidden;
    padding: 20px;
  }
  .atributes {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .atributes div > span {
    color: black;
  }
  .atributes > div {
    font-size: 1.3rem;
    margin: 0;
    padding: 0;
  }

  @media screen and (max-width: 800px) {
    .hero-base {
      display: flex;
      padding: 5px;
      width: 80vw;
    }
    .menu-box {
      font-size: 1rem;
    }
    h2 {
      font-size: 1.5rem;
      margin-top: 0;
    }
    .atributes {
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
    }
    .atributes > div {
      font-size: 1rem;
    }
  }
</style>
