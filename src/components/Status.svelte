<script>
    import Attributes from './Attributes.svelte';
	import { bounceOut } from 'svelte/easing';
    import { createEventDispatcher, onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { isMobile } from '../utils/device';
    
    export let hero;
    
    const dispatch = createEventDispatcher();
    let container;
    
    onMount(() => {
        console.log('container', container)
        console.log('device', isMobile())
        isMobile()? container.style.display = 'none' : 'flex';
    })
    
    function change() {
        dispatch('change', {
            div: this.nextSibling.nextSibling
        })
    }
</script>

<main>
    <h2 on:click={change}>🫀 Status</h2>
    <div class="hero-base" bind:this={container}>
        Level {hero.level}
        <div class="level">
            {#key hero.xp}
                <progress 
                    in:fly={{ x: 5,duration: 200, opacity: 1, easing: bounceOut }} 
                    class="xp-bar" 
                    value={hero.xp} 
                    max="100" 
                />
                {hero.xp} xp
            {/key}
        </div>
        <Attributes hero={hero}/>
    </div>
</main>

<style>
    main {
        width: 270px;
    }

    .hero-base {
		display: flex;
        flex-direction: column;
        border-radius: 10px;
        align-items: center;
        color: black;
        background-color: rgba(255, 255, 255, 0.421);
        margin-top: 10px;
        padding: 20px;
        gap: 5px;
    }

    .level {
        display: flex;
        flex-direction: row;
    }

    progress {
        width: 100px;
    }
</style>