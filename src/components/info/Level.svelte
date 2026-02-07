<script>
  import { items } from '../../data/icons';
  import { fly } from 'svelte/transition';
  import { bounceOut } from 'svelte/easing';

  export let hero;
</script>

<div class="info">
  <div>
    Level {hero.level}
  </div>
  <div>
    {items.use.books.bookCollection}
    Exp:
    {#key hero.xp}
      <progress
        in:fly={{ x: 5, duration: 200, opacity: 1, easing: bounceOut }}
        class="xp-bar"
        value={hero.xp}
        max="100"
      />
    {/key}
  </div>
</div>

<style>
  .info {
    color: whitesmoke;
    font-size: 1.3rem;
    display: flex;
    justify-content: space-around;
    width: 100%;
    text-shadow: 2px 1px 3px black;
  }
</style>
