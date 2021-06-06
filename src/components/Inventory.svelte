<script>
	import { fly } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';

    export let hero;

    let base = {
        power: hero.power,
        guard: hero.guard,
        speed: hero.speed
    }

    let equipments = {
        weapon: {},
        armor: {},
        misc: {}
    }

    $: items = [
        {icon: '🍎', name: 'Maçã', type: 'consumable', description: 'Recupera a vida.', attrib:{life:5} },
        {icon: '🍌', name: 'Banana', type: 'consumable', description: 'Recupera a vida.', attrib:{life:5} },
        {icon: '🔧', name: 'Chave de Boca', type: 'weapon', description: 'Equipamento.', attrib: {power:1}},
        {icon: '🔨', name: 'Martelo', type: 'weapon', description: 'Equipamento.', attrib: {power:2}},
        {icon: '🏹', name: 'Arco & Flecha', type: 'weapon', description: 'Equipamento.', attrib: {power:2}},
        {icon: '🔪', name: 'Faca', type: 'weapon', description: 'Equipamento.', attrib: {power:3}},
        {icon: '🗡️', name: 'Espada', type: 'weapon', description: 'Equipamento.', attrib: {power:4}},
        {icon: '🔫', name: 'Revolver', type: 'weapon', description: 'Equipamento.', attrib: {power:5}},
        {icon: '👕', name: 'Camisa', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
        {icon: '👖', name: 'Calça Jeans', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
        {icon: '👔', name: 'Roupa Social', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
        {icon: '👘', name: 'Kimono', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
        {icon: '💼', name: 'Maleta', type: 'misc', description: 'Equipamento.', attrib: {guard:1}},
        {icon: '🎒', name: 'Mochila', type: 'misc', description: 'Equipamento.', attrib: {guard:1}},
        {},{},{},{},{},{},
    ]

    function useItem(item, index){
        item.type === 'consumable' ? consume(item, index) : equip(item, index);
    }

    function consume(item, index){
        alert(item.icon + item.name + ' consumed!')
        hero.life += item.attrib.life? item.attrib.life: 0;
        items[index] = {}
    }

    function equip(item, index) {
        if (['weapon','armor','misc'].includes(item.type) ){
            let aux = equipments[item.type];
            equipments[item.type] = item;
            items[index] = aux;
            switch(item.type){
                case 'weapon': hero.power = base.power + item.attrib.power;break;
                case 'armor': hero.guard = base.guard + item.attrib.guard;break;
                case 'speed': hero.speed = base.speed + item.attrib.speed;break;
            }
        }
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
            <div>{equipments.weapon.name? equipments.weapon.icon+' '+equipments.weapon.name :'No weapon...'}</div>
            <div>{equipments.armor.name? equipments.armor.icon+' '+equipments.armor.name :'No clothes...'}</div>
            <div>{equipments.misc.name? equipments.misc.icon+' '+equipments.misc.name :'No misc...'}</div>
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
        width: 100%;
        height: 250px;
        padding: 5px;
        display: grid;
        place-items: center;
        grid-template-columns: repeat(5, 50px);
        grid-template-rows: repeat(5, 50px);
        background-color: lightgray;
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