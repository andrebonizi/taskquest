<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import { initialCollapse } from '../utils/collapse';
    import { getAllUsers } from '../data/users';
    const dispatch = createEventDispatcher();
  
    let container;
    export let db
    let rankingPlayers = []

    onMount(async () => {
      initialCollapse(container);
      rankingPlayers = await getAllUsers(db)
      console.log(rankingPlayers, 'rankingPlayers')
    });
  
  
    function change() {
      dispatch('change', {
        div: this.nextSibling.nextSibling,
        height: '300px',
        padding: '10px',
      });
    }
  

  </script>
  
  <main class="menu-box">
    <h2 on:click={change}>Top level players</h2>
  
    <div class="container" bind:this={container}>
      <div class="ranking">
        {#each rankingPlayers as rankingPlayer, index}
                <div class="ranking-player">
                    <div class="ranking-position">{index + 1}º - </div>
              <div class="ranking-player-data">
                {#if rankingPlayer.level}
                    Level {rankingPlayer.level}
                {/if}
                {#if rankingPlayer?.photoSrc}
                    <img class="user-logo" src={rankingPlayer?.photoSrc} alt="profile" />
                {:else}
                    <span>👤</span>
                {/if}
                {#if rankingPlayer.name}
                    {rankingPlayer.name}
                    {:else}
                    <span> Misterious player...</span>
               {/if}
              </div>
            </div>
        {/each}
      </div>
    </div>
  </main>
  
  <style>
    .container {
      display: flex;
      padding: 10px;
      width: 100%;
      padding-top: 20px;
      background-color: rgba(253, 206, 0, 0.646);
      transition: 1s;
      overflow: hidden;
      border-radius: 5px;
      color: black;
      height: fit-content;
    }
  
    .ranking {
      display: flex;
      flex-direction: column;
      text-align: left;
      border-radius: 5px;
      height: fit-content;
      scroll-behavior: auto;
      width: 100%;
      padding: 10px;
    }

    .ranking-position{
        display: flex;
        flex-wrap: nowrap;
    }
  
    .ranking-player {
      display: flex;
      flex-wrap: nowrap;
      margin: 10px;
      padding: 5px;
      border-radius: 10px;
      background: lightgoldenrodyellow;
      font-family: 'Lobster';
      align-items: center;
      user-select: none;
      width: 100%;
      justify-content: left;
    
    
    }
  
    .ranking-player-data {
        display: flex;
        flex-wrap: nowrap;
      
    }
    .ranking-player-data > span{
        display: flex;
        flex-wrap: nowrap;
        margin-right: 5px;
    }
    
    .ranking-player > div {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: left;
      padding-left: 5px;
      padding-right: 5px;
    }

    .user-logo {
    border-radius: 50%;
    height: fit-content;
    min-width: 47px;
    width: 10%;
    padding-left: 5px;
    padding-right: 5px;
  }
  </style>
  