<script lang="ts">
	import TaskList from './components/TaskList.svelte';
	import Battle from './components/Battle.svelte';
	import Inventory from './components/Inventory.svelte';
	import Store from './components/Store.svelte';


	export let name: string;

	let battle;
	$: level = 1;

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
		<Battle level={level} player={hero} on:endBattle={handleBattle} />
	{/if}
	
	<div class="container">
		<Inventory hero={ hero } />
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