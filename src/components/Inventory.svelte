<script lang='ts'>
    import Item from './Item.svelte';

    export let hero;
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