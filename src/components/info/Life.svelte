<script>
  import { fly } from 'svelte/transition';
  import { bounceOut } from 'svelte/easing';

  export let hero;

  const animation = { x: 5, duration: 200, easing: bounceOut, opacity: 1 };
</script>

<div class="life-bar">
  {#key hero.life}
    <p class="heart">🫀</p>
    <progress in:fly={animation} value={hero.life * 10} max="100" />
  {/key}
</div>

<style>
  .heart {
    font-size: 1.5rem;
    margin-right: -20px;
    color: whitesmoke;
    z-index: 0;
  }
  .life-bar {
    font-size: 0.6rem;
    color: white;
    text-shadow: 2px 2px 5px black;
    width: 150px;
    display: flex;
    flex-direction: row;
    padding: 0;
    align-items: center;
  }

  .life-bar > progress {
    border-radius: 20px;
    background-color: green;
  }

  progress::-webkit-progress-bar {
    border-radius: 20px;
  }

  progress::-webkit-progress-value {
    background: linear-gradient(red, black);
    border-radius: 20px;
  }
  progress {
    width: 100px;
  }
</style>
