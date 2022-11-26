<script lang="ts">
	import type { Config as FirebaseConfig } from './interfaces/firebase';

	import TaskList from './components/TaskList.svelte';
	import Battle from './components/Battle.svelte';
	import Inventory from './components/Inventory.svelte';
	import Store from './components/Store.svelte';
	import { initializeApp } from 'firebase/app';
	import { login, logout, AUTH_PROVIDER, getFirebaseAuth, getFirstName } from './utils/auth';
    import { onAuthStateChanged } from 'firebase/auth';
	
	export let firebaseConfig: FirebaseConfig;

	const app = initializeApp(firebaseConfig);
	const auth = getFirebaseAuth(app);
	let battle: boolean;

	$: loggedUser = null;
	$: level = 1;
	$: monster = '';
	$: hero = {
		life: 10,
		power: 1,
		guard: 0,
		speed: 1,
		gold: 0,
		xp: 0,
		level: 1,
		name: getFirstName(loggedUser),
	}

	onAuthStateChanged(auth, (user) => {loggedUser = user});

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
		alert(`Don't give up! You lost 1 life!`)
		hero.life-=1;
	}
</script>

<main>
	{#if battle}
		<Battle
			level={level}
			monster={monster}
			player={hero}
			on:endBattle={handleBattle}
		/>
	{/if}

	<div class="header">
		<div>
			{#if !loggedUser}
				<button 
					on:click={() => {login(auth, AUTH_PROVIDER)}}
				>
					Login
				</button>

			{:else}
				<p 
					class="logout-btn"
					on:click={()=> {logout(auth)}} 
				>
					🚪
				</p>
			{/if}
		</div>
	</div>
	<div class="container">
		<Inventory
			user={loggedUser}
			hero={hero}
		/>
		<TaskList
			player={hero}
			on:startBattle={startBattle}
			on:playerHit={playerHit}
		/>
		<Store />
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

	main {
		text-align: left;
		padding: 1em;
		max-width: 100vw;
		margin: 0;
	}

	.container{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.header{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.logout-btn {
		cursor: pointer;
		font-size: 30px;
		width: min-content;
		line-height: 15px;
		position: absolute;
		top: 0;
		right: 0;
	}

	@media (max-width: 640px) {
		main {
			max-width: none;
		}
		.container{
			flex-direction: column;
			justify-content: flex-start;
		}
	}
</style>