<script>
    export let hero;
</script>

<div class="atributes">
    <div><span>♠︎</span>Attack: <span>{hero.power}</span></div>
    <div><span>♣︎</span>Speed: <span>{hero.speed}</span></div>
    <div><span>♦︎</span>Defense: <span>{hero.guard}</span></div>
</div>

<style>
    .atributes {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
    }

    .atributes div > span {
        color: black;
    }

    .atributes > div{
        font-size: 1rem;
        margin: 1px;
        padding: 1px;
    }
</style>