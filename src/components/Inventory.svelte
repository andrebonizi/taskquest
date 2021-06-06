<script>
	import { fly } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';

    export let hero;

    let equipments = {
        weapon: {},
        clothes: {},
        misc: {}
    }

    let items = [
        {icon: '🍎', name: 'Maçã', type: 'consumable', description: 'Recupera a vida em 10 pontos.' },
        {icon: '🍌', name: 'Banana', type: 'consumable', description: 'Recupera a vida em 10 pontos.' },
        {icon: '🔪', name: 'Adaga', type: 'equipment', description: 'Equipamento.', attrib: {atk:1}},
        {},{},{},{},{},{},{},
    ]

    function useItem(item, index){
        item.type === 'consumable' ? consume(item) : equip(item);
    }

    function consume(item){
        alert(item.icon + item.name + ' consumed!')
    }

    function equip(item) {
        alert(item.icon + item.name  + ' equiped!')
    }

</script>

<main>
    <h2>Inventory</h2>
    <div>
        ♥️ {#key hero.life}
        <progress in:fly={{x: 5, duration: 200, easing: bounceOut, opacity: 1}} value={hero.life*10} max="100" />
        {#key hero.life}{hero.life}        
        {#if hero.life < 3}😰{:else if hero.life < 6}😬{:else if hero.life < 8}😅{:else}🙂{/if}
        {/key}
    
        <div class="atributes">
            <div>♠️Atq: {hero.power}</div>
            <div>♦️Def: {hero.guard}</div>
            <div>♣️Vel: {hero.speed}</div>
        </div>
        {/key}

        <div class="equipments">
            <div>{equipments.weapon.name? equipments.weapon.name :'No weapon...'}</div>
            <div>{equipments.clothes.name? equipments.clothes.name :'No clothes...'}</div>
            <div>{equipments.misc.name? equipments.misc.name :'No misc...'}</div>
        </div>
	</div>
    <div class="container">
        {#each items as item, index}
            <div class="cell" on:click={()=>{useItem(item, index)}} >
                {item.icon? item.icon: ''}
            </div>
        {/each}
    </div>
    <div class="gold">💰 {hero.gold} </div>
</main>

<style>
    .container{
        border: 1px solid black;
        width: 100%;
        height: 250px;
        display: grid;
        place-items: center;
        grid-template-columns: repeat(5, 50px);
        grid-template-rows: repeat(5, 50px);
        background-color: lightgray;
        border: 5px outset whitesmoke;
        border-radius: 20px;
    }
    .cell{
        border: 5px inset whitesmoke;
        border-radius: 10px;
        width: 30px;
        height: 30px;
        font-size: 2rem;
        background-color: whitesmoke;
        cursor: pointer;
    }

	.atributes{
		display: flex;
		width: 100%;
        height: 50px;
        flex-direction: row;
		justify-content: space-around;
        align-items: center;
	}
    .atributes > div{
        border:1px groove black;
        font-size: 1.2rem;
        margin: 1px;
        padding: 5px;
    }

    .equipments{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .equipments > div {
        width: 90%;
        text-align: left;
        padding: 5px;
        margin: 5px;
        padding-left: 10px;
        border: 5px inset whitesmoke;
        background-color: whitesmoke;
    }

	.gold {
        font-size: 2rem;
	}

</style>