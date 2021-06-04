<script>
	import TaskList from './components/TaskList.svelte';
	import Battle from './components/Battle.svelte';
	import { fly } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';

	export let name;

	let battle;
	$: level = 1;

	let hero = {
		life: 100,
		power: 10,
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
	<div>
		{#key hero.life}
		<progress in:fly={{x: 5, duration: 200, easing: bounceOut, opacity: 1}} value={hero.life} max="100" />
		{#key hero.life}
		{hero.life}
		{/key}
		{#if hero.life < 25}😰{:else if hero.life < 50}😬{:else if hero.life < 75}😅{:else}🙂{/if}
		<p> {hero.gold} 💰 </p>
		{/key}
	</div>
	<TaskList on:startBattle={startBattle} />
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