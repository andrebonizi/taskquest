<script>
    import { fly } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';
    import Attributes from './Attributes.svelte';

    export let hero;
</script>

<main>
    <div class="hero-base">
        Level {hero.level} - 
        {#key hero.xp}
            <progress 
                in:fly={{ 
                    x: 5,
                    duration: 200,
                    opacity: 1,
                    easing: bounceOut,
                }} 
                class="xp-bar" 
                value={hero.xp} 
                max="100" 
            />
            {hero.xp} xp
        {/key}
    </div>
    <Attributes hero={hero}/>
</main>

<style>
    main {
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
</style>