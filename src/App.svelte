<script lang="ts">
	import type { Config as FirebaseConfig } from './interfaces/firebase';

	import TaskList from './components/TaskList.svelte';
	import Battle from './components/Battle.svelte';
	import Inventory from './components/Inventory.svelte';
	import Store from './components/Store.svelte';
	import { initializeApp } from 'firebase/app';
	import { getAnalytics } from 'firebase/analytics';
	import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

	export let name: string;
	export let firebaseConfig: FirebaseConfig;

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	const analytics = getAnalytics(app);
	const provider = new GoogleAuthProvider();

	onAuthStateChanged(auth, user => {
		if ( user !== null) {
			console.log('logged in!')
		} else {
			console.log('no user.')
		}
	});



	function login() {
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				console.log(user)
				// ...
			}).catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	}

	let battle: boolean;
	let hero = {
		life: 10,
		power: 1,
		guard: 0,
		speed: 1,
		gold: 0,
		xp: 0,
		level: 1,
		name: name
	}

	$: level = 1;

	function startBattle(event) {
		level = event.detail.level;
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
			player={hero}
			on:endBattle={handleBattle}
		/>
	{/if}

	<div class="header">
		<div>
			Header
		</div>
		<div>
			<button on:click={login}>
				Login
			</button>
		</div>
	</div>
	<div class="container">
		<Inventory
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
		text-align: center;
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