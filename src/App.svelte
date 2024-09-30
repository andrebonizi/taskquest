<script lang="ts">
  import type { Config as FirebaseConfig } from './interfaces/firebase';
  import type { FirebaseApp } from 'firebase/app';
  import type { Auth, User as FirebaseUser } from 'firebase/auth';
  import type { Firestore } from 'firebase/firestore';

  import Battle from './components/Battle.svelte';
  import Inventory from './components/Inventory.svelte';
  import MusicButton from './components/MusicButton.svelte';
  import Store from './components/Store.svelte';
  import TaskList from './components/TaskList.svelte';
  import User from './components/User.svelte';
  import { initializeApp } from 'firebase/app';
  import {
    login,
    logout,
    AUTH_PROVIDER,
    getFirebaseAuth,
  } from './firebase/auth';
  import { onAuthStateChanged } from 'firebase/auth';
  import { getFirstName } from './data/user';
  import { getFirestore } from 'firebase/firestore';
  import { initialItems } from './data/items';
  import { collapse } from './utils/collapse';
  import { setLocalUser } from './utils/cache';
  import { storeUser } from './firebase/data';
  import { player } from './data/player';

  export let firebaseConfig: FirebaseConfig;

  let app: FirebaseApp;
  let auth: Auth;
  let db: Firestore;
  let battle: boolean;

  $: loggedUser = null;
  $: level = 1;
  $: monster = '';
  $: items = initialItems;
  $: hero = player;

  if (window.navigator.onLine) {
    if (firebaseConfig) {
      app = initializeApp(firebaseConfig);
      auth = getFirebaseAuth(app);
      db = getFirestore(app);
      onAuthStateChanged(auth, setUser);
    }
  }

  function setUser(fbUser: FirebaseUser) {
    console.log('auth changed', fbUser);
    if (!fbUser) return;

    setLocalUser(fbUser);
    loggedUser = fbUser;
    storeUser(db, fbUser);
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

  function useItem(event) {
    const maxLife = hero.level * 10;
    hero.life += event.detail.life ? event.detail.life : 0;
    hero.life = hero.life >= maxLife ? maxLife : hero.life;
  }

  function equipItem() {
    //this is weird, but updates info on child components
    hero = hero;
  }
</script>

<main>
  {#if battle}
    <Battle {level} {monster} player={hero} on:endBattle={handleBattle} />
  {/if}

  <div class="header">
    {#if loggedUser}
      <User user={loggedUser} {hero} on:playerHit={playerHit} />
      <button id="logout-btn" class="logout-btn" on:click={() => logout(auth)}>
        Sair 🚪
      </button>
    {:else}
      <User user={{ displayName: 'Ninguém', photoURL: '' }} {hero} />
      <button class="logout-btn" on:click={() => login(auth, AUTH_PROVIDER)}>
        Login
      </button>
    {/if}
  </div>
  <div class="container">
    <div class="menu">
      <!-- <Status {hero} on:change={collapse} /> -->
      <TaskList
        player={hero}
        on:startBattle={startBattle}
        on:playerHit={playerHit}
        on:change={collapse}
      />
      <Inventory
        {hero}
        on:change={collapse}
        on:useItem={useItem}
        on:equipItem={equipItem}
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
  @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

  main {
    background: linear-gradient(to top, black, gray);
    text-align: left;
    padding: 0;
    margin: 0;
    height: 100vh;
    width: 100vw;
  }

  .menu {
    border-radius: 10px;
    border: 2px outset gray;
    font-family: 'Lobster';
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

  button {
    padding: 10px 5px;
    border-radius: 15px;
    margin-left: 10px;
    background: linear-gradient(gray, darkred);
    cursor: pointer;
  }
  .logout-btn {
    cursor: pointer;
    font-family: 'Lobster';
    font-size: 20px;
    width: min-content;
    position: absolute;
    right: 0;
    margin-right: 20px;
    text-shadow: 2px 2px 4px black;
    color: whitesmoke;
  }

  @media screen and (min-width: 800px) {
    .menu {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-around;
    }
  }
</style>
