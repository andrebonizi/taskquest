<script>
	import {fly, blur} from 'svelte/transition';
	import {bounceOut} from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let health = 100;

	function move(node) {
		node.style.top = (Math.random() * 300) +'px';
		node.style.left = (Math.random() * 300) +'px';
	}

	function finishBattle(){
		health = 100
        dispatch('battle', { battle: false} );
	}
</script>

<div class="background">
	<div class="container">
	{#if health === 0} 
		You win! 😵 
		<button on:click={finishBattle}>❌ Finish!</button> 
	{:else}
		{#key health}
			<progress 
				in:fly={{x: 5, duration: 200, easing: bounceOut, opacity: 1}} 
				value={health} max="100" />
		{/key}
		{({100: '🙂', 75: '😅', 50: '😬', 25: '😰'})[health]}
		{#key health}
			<button use:move on:click={() => health -= 25} 
				style="position: absolute;">
				🗡 Attack!
			</button>
		{/key}
	{/if}
	</div>
</div>

<style>
.background{
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(0,0,0,.2);
	z-index: 1;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
.container{
    position: relative;
	background: whitesmoke;
    padding: 20px;
    border: 1px solid black;
    border-radius: 5px;
    height: 300px;
    width: 300px;
	z-index: 2;
	opacity: 1;
}
</style>