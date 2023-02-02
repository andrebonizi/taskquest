<script>
    export let hero;
</script>

<div class="atributes">
    <div><span>♠︎</span>Atk: <span>{hero.power}</span></div>
    <div><span>♣︎</span>Spd: <span>{hero.speed}</span></div>
    <div><span>♦︎</span>Def: <span>{hero.guard}</span></div>
</div>

<style>
    .atributes {
		display: flex;
        height: 50px;
        border-radius: 10px;
		justify-content: space-around;
        align-items: center;
        color: black;
        background-color: rgba(255, 255, 255, 0.421);
	}
   
    .atributes div > span {
        color: black;
    }

    .atributes > div{
        font-size: 1.2rem;
        margin: 1px;
        padding: 5px;
    }
</style>