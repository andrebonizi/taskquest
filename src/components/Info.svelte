<script>
  import { fly } from 'svelte/transition';
  import { bounceOut } from 'svelte/easing';
  import Status from './Status.svelte';
  import { items, status, stuff } from '../data/icons';

  export let hero;
  export let user;
</script>

<main class="container">
  <div class="basic">
    <img
      class="user-logo"
      src={user.photoURL ? user.photoURL : 'char/draw_yourself.png'}
      alt="profile"
    />
    <div class="hero-name">
      {user.displayName.split(' ')[0]}<br />
      <div class="life-bar">
        {#key hero.life}
          <p class="heart">🫀</p>
          <progress
            in:fly={{ x: 5, duration: 200, easing: bounceOut, opacity: 1 }}
            value={hero.life * 10}
            max="100"
          />
        {/key}
      </div>
    </div>
  </div>
  <div class="info">
    <div class="level">
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
  <div class="money">{stuff.money} {hero.gold}</div>
  <Status {hero} />
</main>

<style>
  .basic {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    max-width: 300px;
  }

  .heart {
    font-size: 1.5rem;
    margin-right: -20px;
    color: whitesmoke;
    z-index: 0;
  }

  .money {
    font-size: 1.5rem;
    margin-right: 20px;
    margin-bottom: -10px;
    color: whitesmoke;
    text-shadow: 3px 3px 5px black;
    display: flex;
    align-items: end;
    justify-content: flex-end;
  }

  .container {
    background: linear-gradient(rgba(63, 63, 63, 0.69), rgb(16, 32, 44));
    border-radius: 10px;
    border: 2px outset gray;
    padding-left: 10px;
    font-family: 'Lobster';
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .user-logo {
    border-radius: 50%;
    height: fit-content;
    min-width: 47px;
    width: 10%;
  }

  .hero-name {
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    text-shadow: 3px 3px 5px black;
    color: wheat;
    height: fit-content;
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
    justify-content: space-evenly;
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

  .info {
    color: whitesmoke;
    font-size: 1.3rem;
    display: flex;
    justify-content: space-around;
    width: 100%;
    text-shadow: 2px 1px 3px black;
  }
  progress {
    width: 100px;
  }
  @media screen and (min-width: 800px) {
    .hero-name {
      display: flex;
      flex-direction: column;
      font-size: 2rem;
      text-shadow: 3px 3px 5px black;
      color: wheat;
      height: fit-content;
    }
    .container {
      flex-direction: row;
      gap: 50px;
    }
    .user-logo {
      min-width: 100px;
      width: 20%;
    }
    .heart {
      font-size: 3rem;
      margin-right: -10px;
      color: whitesmoke;
    }
    .money {
      font-size: 3rem;
      color: whitesmoke;
      text-shadow: 3px 3px 5px black;
      display: flex;
      align-items: start;
    }
    .life-bar {
      font-size: 1rem;
      color: white;
      text-shadow: 2px 2px 5px black;
      width: 150px;
      gap: 10px;
      display: flex;
      flex-direction: row;
      padding: 0;
      align-items: center;
      justify-content: space-between;
    }
    .info {
      padding-top: 20px;
      font-size: 1.5rem;
      display: flex;
      justify-content: end;
      flex-direction: column;
      width: min-content;
    }
  }
</style>
