<script lang="ts">
  import type { Config as FirebaseConfig } from './interfaces/firebase';
  import type { FirebaseApp } from 'firebase/app';
  import type { Auth, User } from 'firebase/auth';
  import type { Firestore } from 'firebase/firestore';

  import Battle from './components/battle/Battle.svelte';
  import Inventory from './components/items/Inventory.svelte';
  import MusicButton from './components/MusicButton.svelte';
  import Store from './components/Store.svelte';
  import TaskList from './components/tasks/TaskList.svelte';
  import Info from './components/info/Info.svelte';
  import { initializeApp } from 'firebase/app';
  import {
    login,
    logout,
    AUTH_PROVIDER,
    getFirebaseAuth,
  } from './firebase/auth';
  import { onAuthStateChanged } from 'firebase/auth';
  import { getFirestore } from 'firebase/firestore';
  import { initialItems } from './data/items';
  import { collapse } from './utils/collapse';
  import { setLocalUser } from './data/user';
  import { storeUser } from './firebase/data';
  import { player } from './data/player';
  import { NOBODY_FACE } from './utils/constants';

  export let firebaseConfig: FirebaseConfig;

  let app: FirebaseApp;
  let auth: Auth;
  let db: Firestore;
  let battleOn: boolean;

  $: loggedUser = null;
  $: taskLevel = 1;
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

  function setUser(fbUser: User) {
    console.log('auth changed', fbUser);
    if (!fbUser) return;

    setLocalUser(fbUser);
    loggedUser = fbUser;
    storeUser(db, fbUser);
  }

  function startBattle(event: CustomEvent) {
    const { detail } = event;
    taskLevel = detail.level;
    battleOn = true;
  }

  function endBattle(event: CustomEvent) {
    const { player } = event.detail;
    hero = player;
    battleOn = false;
  }

  function playerHit() {
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

  function updateStats() {
    //this is weird, but forces updates data on child components
    hero = hero;
  }
</script>

<main>
  {#if battleOn}
    <Battle
      level={taskLevel}
      {hero}
      on:endBattle={endBattle}
      on:playerHit={playerHit}
    />
  {/if}

  <div class="header">
    <Info
      user={loggedUser || { displayName: 'Nobody', photoURL: NOBODY_FACE }}
      {hero}
    />
    {#if window.navigator.onLine}
      <button
        class="logout-btn"
        on:click={() => {
          loggedUser ? logout(auth) : login(auth, AUTH_PROVIDER);
        }}
      >
        {!loggedUser ? 'Login 🚪' : 'Sair 🔚'}
      </button>
    {/if}
  </div>
  <div class="container">
    <div class="menu">
      <TaskList
        {hero}
        on:startBattle={startBattle}
        on:playerHit={playerHit}
        on:change={collapse}
      />
      <Inventory
        {hero}
        on:change={collapse}
        on:useItem={useItem}
        on:equipItem={updateStats}
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
