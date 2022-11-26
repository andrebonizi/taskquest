<script lang='ts'>
	import { fly } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';

    import Item from './Item.svelte';

    export let hero;
    export let user;

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


    function useItem(event) {
        const { item } = event.detail;
        if (item.type === 'consumable') consume(item);
        if (item.type === 'weapon' || item.type === 'armor' || item.type === 'misc') equip(item);
    }

    function consume(item) {
        const maxLife = hero.level*10;
        hero.life += item.attrib.life? item.attrib.life: 0;
        hero.life = hero.life >= maxLife ?  maxLife : hero.life;
        alert(`${item.icon}${item.name} used!`)
    }

    function destroyItem(event) {
        const { item } = event.detail;
        items[item.index] = {}
    }

    function equip(item) {
        let aux = equipments[item.type];
        equipments[item.type] = item;
        items[item.index] = aux;

        switch(item.type){
            case 'weapon': hero.power = base.power + item.attrib.power;break;
            case 'armor': hero.guard = base.guard + item.attrib.guard;break;
            case 'speed': hero.speed = base.speed + item.attrib.speed;break;
        }
        alert(`${item.icon}${item.name} equipped!`)
    }

    function getFaceIcon(life) {
        if (life <0 || life >10) return;
        switch (life){
            case 0: case 1: case 2: return '😰';
            case 3: case 4: case 5: return '😬';
            case 6: case 7: case 8: return '😅';
            case 9: case 10: case 11: return '🙂';
        }
    }

    function getEquipDisplay(equip) {
        if (equip.name === undefined) return 'Empty slot...'

        return equip.icon + ' ' + equip.name;
    }
</script>

<main>
    <div>
        <div style="display: inline-flex;">
            {#if user}
                <img class="user-logo" src={user.photoURL} alt={user.displayName}/>
            {/if}
            <div class="hero-name">{hero.name}</div>
        </div>
        <div class="hero-base">
            <div>
                <span>
                    Level: {hero.level}<br>
                    {#key hero.xp}
                        <progress
                            class="xp-bar"
                            in:fly={{
                                x: 5,
                                duration: 200,
                                easing: bounceOut,
                                opacity: 1
                            }}
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
                {getFaceIcon(hero.life)}
                <span class="heart">♥️</span>
            {/key}
        </div>
        <div class="atributes">
            <div>♠︎Atk: {hero.power}</div>
            <div>♦︎Def: {hero.guard}</div>
            <div>♣︎Spd: {hero.speed}</div>
        </div>
        <div class="equipments">
            <div>{getEquipDisplay(equipments.weapon)}</div>
            <div>{getEquipDisplay(equipments.armor)}</div>
            <div>{getEquipDisplay(equipments.misc)}</div>
        </div>
	</div>
    <h2>Inventory</h2>
    <div class="container">
        {#key items}
            {#each items as item, index}
                <Item item={item} index={index} on:use={useItem} on:destroy={destroyItem}/>
            {/each}
        {/key}
    </div>
</main>

<style>
    main{
        background: linear-gradient(rgba(20, 20, 70, 0.493), rgb(16, 32, 44));
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
    .hero-name {
        font-size: 2rem;
        text-shadow: 3px 3px 5px black;
        color: wheat;
        width: fit-content;
    }
    .hero-base{
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
    }

	.user-logo {
		border-radius: 50%;
		margin-right: 30px;
        float: left;
	}
</style>