<script>
	import TaskList from './components/TaskList.svelte';
	import Battle from './components/Battle.svelte';
	import Inventory from './components/Inventory.svelte';
	import Store from './components/Store.svelte';


	export let name;

	let battle;
	$: level = 1;

	let hero = {
		life: 10,
		power: 1,
		guard: 0,
		speed: 1,
		gold: 0,
	}

	function startBattle(event){
		level = event.detail.level;
		battle = true;
	}

	function handleBattle(event) {
		hero = event.detail.player;
		battle = false;
	}
</script>

<main>
	{#if battle}
	<Battle level={level} player={hero} on:endBattle={handleBattle} />
	{/if}
	<h1>{name}'s quests!</h1>

	<div class="container">
		<Inventory hero={ hero } />
		<TaskList on:startBattle={startBattle} />
		<Store />
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 100vw;
		margin: 0;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
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