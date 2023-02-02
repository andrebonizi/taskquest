<script lang='ts'>
	import { fly } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';

    import Item from './Item.svelte';
    import User from './User.svelte';
    import Attributes from './Attributes.svelte';

    export let hero;
    export let user;
    export let items;

    let inventoryCollapsed: boolean = true;

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

    function inventoryCollapse() {
        this.nextSibling.nextSibling.style.display = inventoryCollapsed ? 'flex' : 'none';
        inventoryCollapsed = !inventoryCollapsed;
    }
</script>

<main>
    <div>
        <div style="display: flex; gap: 20px"  >
            {#if user} <User user={user} /> {/if}
            <div class="hero-base">
                Level: {hero.level}<br>
                <div>
                    <span>
                        {#key hero.xp}
                            <progress class="xp-bar" in:fly={{ x: 5, duration: 200, easing: bounceOut, opacity: 1 }} value={hero.xp} max="100" />
                            {hero.xp}
                        {/key}
                    </span>
                    <span>
                        {hero.gold} 💰
                    </span>
                </div>
            </div>
        </div>

        <div class="life-bar">
            {#key hero.life}
                <span class="heart">♥️</span>
                <progress in:fly={{x: 5, duration: 200, easing: bounceOut, opacity: 1}} value={hero.life*10} max="100" />
                {hero.life}
                {getFaceIcon(hero.life)}
            
            {/key}
        </div>
        <Attributes hero={hero}/>
	</div>
    <br>
    <h2 on:click={inventoryCollapse}>🧳 Inventory </h2>
    <div class="inventory">
        <div class="equipments">
            <div>{getEquipDisplay(equipments.weapon)}</div>
            <div>{getEquipDisplay(equipments.armor)}</div>
            <div>{getEquipDisplay(equipments.misc)}</div>
        </div>
        <div class="container">
            {#key items}
                {#each items as item, index}
                    <Item item={item} index={index} on:use={useItem} on:destroy={destroyItem}/>
                {/each}
            {/key}
        </div>
    </div>
</main>

<style>
    main {
        background: linear-gradient(rgba(63, 63, 63, 0.69), rgb(16, 32, 44));
        border-radius: 10px;
        border: 2px outset gray;
        padding: 10px;
        font-family: 'Lobster';
        padding-bottom: 30px;
        width: 100%;
    }

    h2 {
        text-shadow: 2px 5px 2px black;
        color: white;
        line-height: 5px;
        margin-top: 20px;
        padding-left: 10px;
        cursor: pointer;
        z-index: 5;
    }

    .inventory {
        display: none;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        transition: 1ms;
        background: gray;
        background-size: 50%;
        border-radius: 10px;
        border: 5px outset gray;
        width: min-content;
    }

    .hero-base {
        display: flex;
        justify-content: space-evenly;
    }

    .hero-base > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        color: black;
        text-shadow: 2px 2px 5px white;
        width: 50%;
    }
  
    .heart {
        color: rgb(110, 0, 0);
        font-size: 2rem;
        text-shadow: 2px 2px 2px rgb(129, 123, 123);
    }

    .life-bar {
        font-size: 1rem;
        color: black;
        text-shadow: 2px 2px 5px gray;
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 0 10px;
        align-items: center;
        justify-content: space-between;
    }

    .life-bar > progress {
        border-radius: 20px;
        background-color: green;
        border: 2px solid green;
    }

    progress::-webkit-progress-bar {
        border-radius: 20px;
    }

    progress::-webkit-progress-value {
        background: linear-gradient(red, black);
        border-radius: 20px;
    }

    .xp-bar {
        width: 50px;
    }

    .container {
        width: fit-content;
        padding: 5px;
        display: grid;
        place-items: center;
        grid-template-columns: repeat(5, 50px);
        grid-template-rows: repeat(5, 50px);
    }

    .equipments {
        display: flex;
        flex-direction: column;
        padding: 20px;
        border-radius: 10px 10px 0px 0px;
        width: 260px;
    }

    .equipments > div {
        display: flex;
        justify-items: center;
        align-items: center;
        text-align: left;
        padding: 5px;
        margin: 5px;
        padding-left: 10px;
        border: 3px inset rgb(146, 146, 146);
        background-color: rgb(245, 245, 245);
    }

    @keyframes opacityChange {
        0% {
            opacity:0.5;
        }

        100% {
            opacity:0;
        }
    }

    @keyframes rotate {
        100% {
            transform: rotate(1turn);
        }
}
</style>