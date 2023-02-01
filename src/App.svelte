<script lang="ts">
	import type { Config as FirebaseConfig } from './interfaces/firebase';

	import TaskList from './components/TaskList.svelte';
	import Battle from './components/Battle.svelte';
	import Inventory from './components/Inventory.svelte';
	import Store from './components/Store.svelte';
	import { initializeApp } from 'firebase/app';
	import { login, logout, AUTH_PROVIDER, getFirebaseAuth } from './utils/auth';
    import { onAuthStateChanged } from 'firebase/auth';
    import MusicButton from './components/MusicButton.svelte';
    import { getFirstName, player, storeUser } from './data/user';
    import { getFirestore } from 'firebase/firestore';
	import { initialItems } from './data/items';
	
	export let firebaseConfig: FirebaseConfig;

	const app = initializeApp(firebaseConfig);
	const auth = getFirebaseAuth(app);
	const db = getFirestore(app);
	
	let battle: boolean;

	$: loggedUser = null;
	$: level = 1;
	$: monster = '';
	$: items = initialItems;
	$: hero = player;

	onAuthStateChanged(auth, setUer);

	function setUer(user) {
		console.log('User: ', user)
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
		alert(`You lost 1 life!`)
		hero.life-=1;
	}

	function buyItem(event){
		const newItem = event.detail.product
		const addToInventory = addItemToInvetory(newItem)
		if(!addToInventory){
			return alert('Your inventory is Full!')
		}
		hero.gold -= newItem.price
	}

	function addItemToInvetory(newItem){
		let emptySlot = items.find(item => !item.name)
		let emptySlotIndex = items.indexOf(emptySlot)
		if(emptySlotIndex == -1){
			return (false)
		}
		items[emptySlotIndex] = newItem
		return true
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
			items={items}
		/>
		<TaskList
			player={hero}
			on:startBattle={startBattle}
			on:playerHit={playerHit}
		/>
		<Store gold={hero.gold} on:buyItem={buyItem}/>
		<MusicButton />
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

	main {
		text-align: left;
		padding: 1em;
		max-width: 100vw;
		margin: 0;
		max-height: 100%;

	}

	.container{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		max-height: 100%;
	}

	.header{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex: 1;
	}

	.logout-btn {
		cursor: pointer;
		font-size: 30px;
		width: min-content;
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