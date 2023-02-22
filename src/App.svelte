<script lang="ts">
  import type { Config as FirebaseConfig } from "./interfaces/firebase";

  import TaskList from "./components/TaskList.svelte";
  import Battle from "./components/Battle.svelte";
  import User from "./components/User.svelte";
  import Inventory from "./components/Inventory.svelte";
  import Status from "./components/Status.svelte";
  import Store from "./components/Store.svelte";
  import { initializeApp } from "firebase/app";
  import { login, logout, AUTH_PROVIDER, getFirebaseAuth } from "./utils/auth";
  import { onAuthStateChanged } from "firebase/auth";
  import MusicButton from "./components/MusicButton.svelte";
  import { getFirstName, player, storeUser } from "./data/user";
  import { getFirestore } from "firebase/firestore";
  import { initialItems } from "./data/items";
  import { collapse } from "./utils/collapse";

  export let firebaseConfig: FirebaseConfig;

  const app = initializeApp(firebaseConfig);
  const auth = getFirebaseAuth(app);
  const db = getFirestore(app);

  let battle: boolean;

  $: loggedUser = null;
  $: level = 1;
  $: monster = "";
  $: items = initialItems;
  $: hero = player;

  onAuthStateChanged(auth, setUser);

  function setUser(user) {
    loggedUser = user;
    hero.name = getFirstName(loggedUser);
    storeUser(db, user);
  }

  function startBattle(event) {
    level = event.detail.level;
    monster = event.detail.monster;
    battle = true;
  }

  function handleBattle(event) {
    hero = event.detail.player;
    battle = false;
  }

  function playerHit() {
    alert(`You lost 1 life!`);
    hero.life -= 1;
  }

  function updateItems(event) {
    items = event.detail.items;
    hero.gold = event.detail.gold;
  }
</script>

<main>
  {#if battle}
    <Battle {level} {monster} player={hero} on:endBattle={handleBattle} />
  {/if}

  <div class="header">
    {#if loggedUser} <User user={loggedUser} {hero} /> {/if}
    <div>
      {#if !loggedUser}
        <button on:click={() => login(auth, AUTH_PROVIDER)}> Login </button>
      {:else}
        <p class="logout-btn" on:click={() => logout(auth)}>🚪</p>
      {/if}
    </div>
  </div>
  <div class="container">
    <div class="menu">
      <Status {hero} on:change={collapse} />
      <Inventory {hero} {items} on:change={collapse} />
      <TaskList
        player={hero}
        on:startBattle={startBattle}
        on:playerHit={playerHit}
        on:change={collapse}
      />
      <Store
        gold={hero.gold}
        {items}
        on:change={collapse}
        on:buy={updateItems}
      />
    </div>
    <MusicButton />
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");

  main {
    background: linear-gradient(to top, gray, white);
    text-align: left;
    padding: 8px;
    margin: 0;
    height: 100vh;
    width: 100vw;
  }

  .menu {
    background: linear-gradient(
      rgba(165, 42, 42, 0.773),
      rgba(173, 87, 17, 0.838)
    );
    border-radius: 10px;
    border: 2px outset gray;
    font-family: "Lobster";
    width: 100%;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    height: fit-content;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .logout-btn {
    cursor: pointer;
    font-size: 30px;
    width: min-content;
  }

  @media screen and (min-width: 800px) {
    .menu {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-around;
    }
  }
</style>
