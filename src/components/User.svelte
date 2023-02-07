<script>
    import { fly } from 'svelte/transition';
    import { bounceOut } from "svelte/easing";

    export let hero;
    export let user;

    function getFaceIcon(life) {
        if (life <0 || life >10) return;
        switch (life){
            case 0: case 1: case 2: return '😰';
            case 3: case 4: case 5: return '😬';
            case 6: case 7: case 8: return '😅';
            case 9: case 10: case 11: return '🙂';
        }
    }
</script>

<main class="container">
    <div class="basic">
        <img class="user-logo"  src={user.photoURL} alt={user.displayName}/>
        <div class="hero-name">
            {user.displayName.split(' ')[0]}<br>
            <div class="life-bar">
                {#key hero.life}
                    {getFaceIcon(hero.life)}
                    <progress in:fly={{x: 5, duration: 200, easing: bounceOut, opacity: 1}} value={hero.life*10} max="100" />
                    {hero.life}
                {/key}
            </div>
        </div>
    </div>
</main>

<style>
    .basic {
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
    }

    .container {
        background: linear-gradient(rgba(63, 63, 63, 0.69), rgb(16, 32, 44));
        border-radius: 10px;
        border: 2px outset gray;
        padding: 10px;
        font-family: 'Lobster';
        padding-bottom: 30px;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .user-logo {
		border-radius: 50%;
        height: fit-content;
        min-width: 47px;
        width: 10%;
	}

    .hero-name {
        display: flex;
        flex-direction: column;
        font-size: 2rem;
        text-shadow: 3px 3px 5px black;
        color: wheat;
        width: 100%;
        height: fit-content;
        align-items: center;
    }

    .life-bar {
        font-size: 1rem;
        color: white;
        text-shadow: 2px 2px 5px black;
        width: 150px;
        gap: 10px;
        display: flex;
        flex-direction: row;
        padding: 0;
        align-items: center;
        justify-content: space-between;
    }

    .life-bar > progress {
        border-radius: 20px;
        background-color: green;
    }

    progress::-webkit-progress-bar {
        border-radius: 20px;
    }

    progress::-webkit-progress-value {
        background: linear-gradient(red, black);
        border-radius: 20px;
    }

    @media screen and (min-width: 800px) {
        .container {
            flex-direction: row;
            gap: 50px;
        }
        .user-logo {
            min-width: 100px;
            width: 20%;
        }
    }
</style>