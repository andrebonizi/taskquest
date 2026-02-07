<script>
  import Level from './Level.svelte';
  import Life from './Life.svelte';
  import Status from './Status.svelte';
  import { getFirstName } from '../../data/user';
  import { stuff } from '../../data/icons';
  import { imageValidation } from '../../data/user';

  export let hero;
  export let user;

  const { money } = stuff;
  const { photoURL } = user;
</script>

<main class="container">
  <div class="basic">
    <img class="user-logo" src={photoURL} alt="profile" />
    <div class="hero-name">
      {getFirstName(user)}<br />
      <Life {hero} />
    </div>
    <div class="money">
      <span>
        {money}{hero.gold}
      </span>
    </div>
  </div>
  <Status {hero} />
  <Level {hero} />
</main>

<style>
  .basic {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    max-width: 300px;
  }

  .money {
    font-size: 1.5rem;
    color: whitesmoke;
    text-shadow: 3px 3px 5px black;
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

  .user-logo {
    min-width: 100px;
    width: 100%;
    height: min-content;
    max-height: 100px;
    margin: 20px;
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
  }
</style>
