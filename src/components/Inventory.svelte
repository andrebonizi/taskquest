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
        {icon: '🍎', name: 'Apple', type: 'consumable', description: 'Recupera a vida.', attrib:{life:5} },
        {icon: '🍌', name: 'Banana', type: 'consumable', description: 'Recupera a vida.', attrib:{life:5} },
        {icon: '🔧', name: 'Wrench', type: 'weapon', description: 'Equipamento.', attrib: {power:1}},
        {icon: '🔨', name: 'Hammer', type: 'weapon', description: 'Equipamento.', attrib: {power:2}},
        {icon: '🏹', name: 'Bow', type: 'weapon', description: 'Equipamento.', attrib: {power:2}},
        {icon: '🔪', name: 'Knife', type: 'weapon', description: 'Equipamento.', attrib: {power:3}},
        {icon: '🗡️', name: 'Sword', type: 'weapon', description: 'Equipamento.', attrib: {power:4}},
        {icon: '🔫', name: 'Revolver', type: 'weapon', description: 'Equipamento.', attrib: {power:5}},
        {icon: '👕', name: 'Shirt', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
        {icon: '👖', name: 'Jeans', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
        {icon: '👔', name: 'Formal Shirt', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
        {icon: '👘', name: 'Kimono', type: 'armor', description: 'Equipamento.', attrib: {guard:1}},
        {icon: '💼', name: 'Mallet', type: 'misc', description: 'Equipamento.', attrib: {guard:1}},
        {icon: '🎒', name: 'Backpack', type: 'misc', description: 'Equipamento.', attrib: {guard:1}},
        {},{},{},{},{},{},
    ]

    function useItem(item, index) {
        item.type === 'consumable' ? consume(item, index) : equip(item, index);
    }

    function consume(item, index) {
        alert(item.icon + item.name + ' consumed!')
        const maxLife = hero.level*10;
        hero.life += item.attrib.life? item.attrib.life: 0;
        hero.life = hero.life >= maxLife ?  maxLife : hero.life;
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
    <div>
        <div class="hero-base">
            {hero.name}
            <div>
                <span>
                    Level  - {hero.level}♛<br>
                    {#key hero.xp}
                    <progress 
                        class="xp-bar" 
                        in:fly={{x: 5, duration: 200, easing: bounceOut, opacity: 1}} 
                        value={hero.xp} 
                        max="100" 
                    />
                    {hero.xp}
                    {/key}
                </span>
                <span>
                    {hero.gold}💰
                </span>
            </div>
        </div>
        <div class="life-bar">
            {#key hero.life} 
                <progress in:fly={{x: 5, duration: 200, easing: bounceOut, opacity: 1}} value={hero.life*10} max="100" />
                {hero.life}        
                {#if hero.life < 3}😰{:else if hero.life < 6}😬{:else if hero.life < 8}😅{:else}🙂{/if}
                <span class="heart">♥️</span>
            {/key}
        </div>
        <div class="atributes">
            <div>♠︎Atk: {hero.power}</div>
            <div>♦︎Def: {hero.guard}</div>
            <div>♣︎Spd: {hero.speed}</div>
        </div>
        <div class="equipments">
            <div>{equipments.weapon.name? equipments.weapon.icon+' '+equipments.weapon.name :'No weapon...'}</div>
            <div>{equipments.armor.name? equipments.armor.icon+' '+equipments.armor.name :'No clothes...'}</div>
            <div>{equipments.misc.name? equipments.misc.icon+' '+equipments.misc.name :'No misc...'}</div>
        </div>
	</div>
    <h2>Inventory</h2>
    <div class="container">
        {#each items as item, index}
            <div class="cell" on:click={()=>{useItem(item, index)}} >
                {item.icon? item.icon: ''}
            </div>
        {/each}
    </div>
</main>

<style>
    main{
        background: linear-gradient(rgba(20, 20, 70, 0.493), gray);
        border-radius: 10px;
        border: 2px outset gray;
        padding: 10px;
        font-family: 'Lobster';
    }
    h2{
        text-shadow: 2px 2px 4px white;
        color: black;
        line-height: 5px;
    }
    .hero-base{
        font-size: 2rem;
        text-shadow: 3px 3px 5px black;
        color: wheat;
        display: flex;
        justify-content: space-evenly;
    }
    .hero-base > div{
        display: flex;
        justify-content: space-between;
        font-size: 1rem;
        color: black;
        text-shadow: 2px 2px 5px white;
        width: 50%;
    }
    .heart{
        color: rgb(110, 0, 0);
        font-size: 2rem;
        text-shadow: 2px 2px 2px rgb(129, 123, 123);
    }
    .life-bar {
        display: inline;
        font-size: 1rem;
        color: black;
        text-shadow: 2px 2px 5px gray;
    }
    .life-bar > progress{
        border-radius: 20px;
    }
    progress::-webkit-progress-bar {
        border-radius: 20px;
    }
    progress::-webkit-progress-value {
        background: linear-gradient(red, black);
        border-radius: 20px;
    }
    .xp-bar{
        width: 50px;
    }
    .container{
        width: fit-content;
        padding: 5px;
        display: grid;
        place-items: center;
        grid-template-columns: repeat(5, 50px);
        grid-template-rows: repeat(5, 50px);
        background: linear-gradient(white, grey);
        border-radius: 10px;
        border: 5px outset gray;
    }
    .cell{
        border: 5px inset gray;
        border-radius: 2px;
        width: 30px;
        height: 30px;
        font-size: 1.5rem;
        background-color: lightgray;
        cursor: pointer;
    }
	.atributes{
		display: flex;
		width: 100%;
        height: 50px;
		justify-content: space-around;
        align-items: center;
        color: black;
	}
    .atributes > div{
        font-size: 1.2rem;
        margin: 1px;
        padding: 5px;
    }
    .equipments{
        display: flex;
        flex-direction: column;
    }
    .equipments > div {
        text-align: left;
        padding: 5px;
        margin: 5px;
        padding-left: 10px;
        border: 3px inset rgb(146, 146, 146);
        background-color: whitesmoke;
        border-radius: 10px;
    }

</style>