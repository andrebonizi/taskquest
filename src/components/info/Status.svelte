<script>
  import Life from './Life.svelte';
  import { items, stuff } from '../../data/icons';
  import { fly } from 'svelte/transition';
  import { bounceOut } from 'svelte/easing';
  import { getFirstName } from '../../data/user';
  import { getPhotoURL } from '../../data/user';
  import { getFaceIcon } from '../../data/icons';
  export let hero;
  export let user;

  const { coin } = stuff;
  const { use } = items;
</script>

<main class="menu-box">
  <div class="header">
    <img class="user-logo" src={getPhotoURL(user)} alt="profile" />
    <h2 class="hero-name">{getFirstName(user)}</h2>
  </div>
  <div class="window">
    <div>
      <Life {hero} />
      Attack:{#key hero.power}{hero.power}{/key}<br />
      Defense:{#key hero.guard}{hero.guard}{/key}<br />
      Speed:{#key hero.speed}{hero.speed}{/key}<br />
    </div>
    <div>
      Status {getFaceIcon(hero.life)}<br />
      Money ${hero.gold}{coin}<br />
      Level {hero.level}{use.books.bookCollection}<br />
      Exp:
      {#key hero.xp}
        <progress
          in:fly={{ x: 5, duration: 200, opacity: 1, easing: bounceOut }}
          class="xp-bar"
          value={hero.xp}
          max="100"
        />
      {/key}<br />
    </div>
  </div>
</main>

<style>
  .header {
    display: flex;
    align-items: end;
  }
  .menu-box {
    display: flex;
    flex-direction: column;
    width: fit-content;
    padding: 0;
    border-radius: 10px;
    font-size: 1rem;
  }
  .user-logo {
    border-radius: 50%;
    width: min-content;
    height: min-content;
    max-height: 100px;
    position: relative;
    margin-bottom: -30px;
    z-index: 1;
    filter: drop-shadow(3px 5px 6px black);
  }
  .window {
    display: flex;
    background: linear-gradient(white, burlywood);
    filter: drop-shadow(3px 5px 6px black);
    border: 1px solid black;
    border-radius: 25px;
    align-items: flex-start;
    color: black;
    gap: 40px;
    padding: 20px;
  }
  .hero-name {
    font-size: 2rem;
    text-shadow: 3px 3px 5px black;
    color: goldenrod;
    height: fit-content;
  }
</style>
