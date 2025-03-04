<script>
  import { fly } from 'svelte/transition';
  import { bounceOut } from 'svelte/easing';
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { clock } from '../../data/icons';
  import { enemies } from '../../data/enemies';
  import {
    damage,
    quickTiming,
    slowTiming,
    tackle,
  } from '../../data/animation';
  import Background from './Background.svelte';

  export let level = 1;
  export let hero;

  const dispatch = createEventDispatcher();

  let count = 12;
  let timer;
  let attackBtn;
  let monster;

  $: trigger = false;
  $: enemy = { life: 10 * level, power: 1 * level, speed: 1 * level };
  $: player = hero;

  function startTimer() {
    trigger = true;
    return setTimeout(function () {
      const actionSpeed =
        enemy.speed - player.speed >= 1 ? enemy.speed - player.speed : 1;
      count -= actionSpeed;
      if (count <= 0) {
        enemyAttack();
      }
      return enemy.life <= 0 ? clearTimeout(timer) : startTimer();
    }, 100);
  }

  function move(node) {
    if (node) {
      node.style.top = Math.random() * (window.screen.height / 2) + 'px';
      node.style.left = Math.random() * (window.screen.width / 2) + 'px';
    }
  }

  function switchTrigger() {
    trigger = !trigger;
  }

  function playerAttack() {
    monster.animate(damage, slowTiming);
    enemy.life = enemy.life - player.power;
    switchTrigger();
    resetCount();
  }

  function enemyAttack() {
    monster.animate(tackle, quickTiming);
    //player.life -= enemy.power - player.guard;
    dispatch('playerHit', { damage: enemy.power });
    move(attackBtn);
    resetCount();
  }

  function resetCount() {
    count = 12;
  }

  function gainXp() {
    player.xp += level * 3;
    if (player.xp >= 100) {
      player.level++;
      player.xp = 0;
    }
  }

  function finishBattle() {
    clearTimeout(timer);
    if (player.life > 0) {
      player.gold += level;
      gainXp();
    } else {
      player.life = player.maxLife;
      player.gold = 0;
    }
    dispatch('endBattle', { player: player });
  }

  onMount(() => (timer = startTimer()));
  onDestroy(() => clearTimeout(timer));
</script>

<div class="background">
  {#if player.life <= 0}
    <button class="btn" on:click={finishBattle}>💀 ...Game Over... 💀</button>
  {:else}
    <Background />
    <div class="container">
      {#if enemy.life <= 0}
        <div class="battle-reward">
          <h1>You win! 🎉</h1>
          <h1>Got {level} money! 💵</h1>
          <button class="btn" on:click={finishBattle}> All right! </button>
        </div>
      {:else}
        <div class="health-bars">
          <div>
            Monster:
            {#key enemy.life}
              <progress
                in:fly={{ x: 5, duration: 200, easing: bounceOut, opacity: 1 }}
                value={enemy.life}
                max={10 * level}
              />
            {/key}
            {enemy.life}
            💀
          </div>
        </div>
        <div class="monster" bind:this={monster}>
          {enemies[level - 1].icon}
        </div>
        {#if trigger}
          <button
            class="btn"
            use:move
            on:click={playerAttack}
            bind:this={attackBtn}
          >
            {#key count}{clock[count]}{/key}Hit!🎯
          </button>
        {/if}
      {/if}
    </div>
  {/if}
</div>

<style>
  .health-bars {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
  .battle-reward {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    color: white;
    text-shadow: 1px 3px 5px black;
  }
  .btn {
    font-size: 1.5rem;
    border-style: outset;
    position: absolute;
    background: linear-gradient(to top, transparent, lightblue, transparent);
    width: 100px;
    opacity: 0.8;
    display: flex;
    justify-content: space-around;
    border-radius: 50px;
  }
  .background {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 10;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .container {
    position: relative;
    background: rgba(0, 0, 0, 0.4);
    padding: 20px;
    border: 1px outset black;
    border-radius: 50px;
    height: 100%;
    width: 100%;
    z-index: 2;
    opacity: 1;
  }
  .monster {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 15rem;
  }

  @media screen and (max-width: 800px) {
    .container {
      padding: 0;
      width: 90%;
      height: 100%;
    }

    .monster {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      font-size: 9rem;
    }
  }
</style>
