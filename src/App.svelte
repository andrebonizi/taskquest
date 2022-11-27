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
	let selected: boolean = true

	$: loggedUser = null;
	$: level = 1;
	$: monster = '';
	$: hero = {
		life: 10,
		power: 1,
		guard: 0,
		speed: 1,
		gold: 51,
		xp: 0,
		level: 1,
		name: getFirstName(loggedUser),
	}

	$: items = [
        {icon: '🍎', name: 'Apple', type: 'consumable', description: 'Recupera a vida.', attrib:{life:5} },
        {icon: '🍌', name: 'Banana', type: 'consumable', description: 'Recupera a vida.', attrib:{life:5} },
        {icon: '🔧', name: 'Wrench', type: 'weapon', description: 'Equipamento.', attrib: {power:1}},
        {icon: '🔨', name: 'Hammer', type: 'weapon', description: 'Equipamento.', attrib: {power:2}},
        {icon: '🏹', name: 'Bow', type: 'weapon', description: 'Equipamento.', attrib: {power:2}},
        {icon: '🔪', name: 'Knife', type: 'weapon', description: 'Equipamento.', attrib: {power:3}},
        {icon: '🗡️', name: 'Sword', type: 'weapon', description: 'Equipamento.', attrib: {power:4}},
        {icon: '🔫', name: 'Revolver', type: 'weapon', description: 'Equipamento.', attrib: {power:5}},
        {icon: '👕', name: 'Shirt', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
        {icon: '👖', name: 'Jeans', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
        {icon: '👔', name: 'Formal Shirt', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
        {icon: '👘', name: 'Kimono', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
        {icon: '💼', name: 'Mallet', type: 'misc', description: 'Equipamento.', attrib: {guard:1}},
        {icon: '🎒', name: 'Backpack', type: 'misc', description: 'Equipamento.', attrib: {guard:1}},
		{},{},{},{},{},{},{},{},{},{},{}
    ]

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

	function buyItem(event){
		const newItem = event.detail.product
		const productPrice = newItem.price
		const addToInventory = addItemToInvetory(newItem)
		if(!addToInventory){
			return alert('Your inventory is Full!')
		}
		hero.gold -= productPrice
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

	function stopMusic(event){
		event.preventDefault();
		const audioEl = document.querySelector('#bg-music') as HTMLAudioElement
		
		if(audioEl.src.includes('music')){
			selected = false
			audioEl.src = ''
		} else {
			audioEl.src = '/music/gangsta_medieval.mp3'
			selected = true
		}
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
	
		<!-- svelte-ignore a11y-media-has-caption -->
		<audio id="bg-music" src="/music/gangsta_medieval.mp3" autoplay loop controls hidden></audio>	
		<button class="{selected ? 'selected' : ''}" on:click={(ev)=> {stopMusic(ev)}}  id="bg-music-control">🎵</button>

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
	#bg-music-control {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		padding: 15px;
		bottom: 10px;
		right: 10px;
		width: 10px;
		height: 10px;
		cursor: pointer;
		box-shadow: 3px 3px 3px rgb(83, 83, 83);
		background: linear-gradient(white, gray);
	}

	.selected{
		background: linear-gradient(white, green) !important;
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