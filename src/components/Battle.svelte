<script>
	import { fly } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	export let level = 1;
	export let player;
	const maxLife = player.life;
	
	let trigger = false;
	let count = 12;
	let timer;
	$: enemy = {
		life: 10 * level,
		power: 1 * level,
		speed: 1 * level,
	};
	
	$: player = player;
	
	onMount(() =>{
		timer = startTimer();
	})

	onDestroy(()=>{
		clearTimeout(timer);
	})

	function startTimer() {
		return setTimeout(function() {
			const actionSpeed = enemy.speed - player.speed >= 1 ? enemy.speed - player.speed : 1;
			count -= actionSpeed;
			count <= 0 ? enemyAttack() : '';
			return enemy.life <= 0 ? clearTimeout(timer) : startTimer();
		}, 100 )
	}
	
	function move(node) {
		node.style.top = (Math.random() * (window.screen.height/2) ) +'px';
		node.style.left = (Math.random() * (window.screen.width/2) ) +'px';
	}


	function switchTrigger(){
		trigger = trigger === true? false : true;
	}

	function playerAttack() {
		enemy.life = enemy.life - player.power;
		resetCount();
		switchTrigger();
	}

	function enemyAttack() {
		player.life -= (enemy.power - player.guard);
		resetCount();
		switchTrigger();
	}

	function resetCount() {
		count = 12;
	}

	function gainXp(player) {
		let curXp = player.xp;
		let curLvl = player.level;



	}

	function finishBattle() {
		clearTimeout(timer);
		if( player.life > 0 ){
			player.gold += level;
		}else{
			player.life = player.maxLife;
			player.gold = 0;
		}
		dispatch('endBattle', { player: player } );
	}
</script>

<div class="background">
	{#if player.life <= 0}
		You Lost....💀
		<button on:click={finishBattle}>❌ Finish!</button> 
	{:else}
		<div class="container">
			{#if enemy.life <= 0} 
				<div class="battle-reward">
					<h1>You win! 🎉</h1>
					<h2>Got {level}💵 money!</h2>
					<button on:click={finishBattle}>
						❌ Finish!
					</button> 
				</div>

			{:else}
				<div class="health-bars">
					<div>
						{player.name}:
						{#if player.life < 3}😰{:else if player.life < 6}😬{:else if player.life < 8}😅{:else}🙂{/if}
						{#key player.life}
							{player.life}
						{/key}
						{#key player.life}
						<progress in:fly={{x: 5, duration: 200, easing: bounceOut, opacity: 1}} value={player.life} max={maxLife} />
						{/key}
					</div>
					<div>
						Enemy:
						{#key enemy.life}
							<progress in:fly={{x: 5, duration: 200, easing: bounceOut, opacity: 1}} value={enemy.life} max={10 * level} />
						{/key}
						{enemy.life}
						💀
					</div>
				</div>
				{#key trigger}
					<button use:move on:click={ playerAttack } style="position: absolute;">
						<p class='attack'>🗡 Attack!
						{#key count}
							{({12: '🕐', 11: '🕑', 10: '🕒', 9: '🕓', 8: '🕔', 7: '🕕',
							6: '🕖', 5: '🕗', 4: '🕘', 3: '🕙', 2: '🕚', 1: '🕛'})[count]}
						{/key}
						</p>
					</button>
				{/key}
			{/if}
		</div>
	{/if}
</div>

<style>
.health-bars {
	display: flex;
	justify-content: space-between;
}
.battle-reward{
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}
.attack{
	font-size: 1.5rem;
}
button{
	border-radius: 50px;
}
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
    border-radius: 50px;
    height: 50%;
    width: 50%;
	z-index: 2;
	opacity: 1;
}
</style>