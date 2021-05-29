<script>
	import TaskList from './components/TaskList.svelte';
	import Battle from './components/Battle.svelte';

	export let name;

	let battle;

	function handleBattle(event) {
		battle = event.detail.battle;
	}
</script>

<main>
	{#if battle}
		<Battle on:battle={handleBattle} />
	{/if}
	<h1>{name}'s quests!</h1>
	<TaskList on:battle={handleBattle} />
	<p>💰</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>