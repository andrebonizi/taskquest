<script lang="ts">
  import Item from './Item.svelte';
  import { createEventDispatcher, onMount } from 'svelte';
  import { initialCollapse } from '../utils/collapse';

  export let hero;
  export let items;

  const dispatch = createEventDispatcher();

  let container: HTMLDivElement;
  let equipments = { weapon: {}, armor: {}, misc: {} };

  onMount(() => {
    initialCollapse(container);
  });

  function useItem(event) {
    const { item } = event.detail;
    if (item.type === 'consumable') consume(item);
    if (item.type === 'weapon' || item.type === 'armor' || item.type === 'misc')
      equip(item);
  }

  function consume(item) {
    alert(`${item.icon}${item.name} used!`);
    dispatch('useItem', {
      life: item.attrib.life,
    });
  }

  function destroyItem(event) {
    const { item } = event.detail;
    items[item.index] = {};
  }

  function equip(item: Item) {
    let aux = equipments[item.type];
    equipments[item.type] = item;
    items[item.index] = aux;
    //tech debt - attrib infinite increase
    switch (item.type) {
      case 'weapon':
        hero.power += item.attrib.power;
        break;
      case 'armor':
        hero.guard += item.attrib.guard;
        break;
      case 'speed':
        hero.speed += item.attrib.speed;
        break;
    }
    dispatch('equipItem', {
      equip: item,
    });
    alert(`${item.icon}${item.name} equipped!`);
  }

  function getEquipDisplay(equip) {
    if (equip.name === undefined) return 'Nothing...';

    return equip.icon + ' ' + equip.name;
  }

  function change() {
    dispatch('change', {
      div: this.nextSibling.nextSibling,
      height: '450px',
      padding: '0px',
    });
  }
</script>

<main class="menu-box">
  <h2 on:click={change}>🧳 Inventory</h2>
  <div class="inventory" bind:this={container}>
    <div class="equipments">
      <div>{getEquipDisplay(equipments.weapon)}</div>
      <div>{getEquipDisplay(equipments.armor)}</div>
      <div>{getEquipDisplay(equipments.misc)}</div>
    </div>
    <div class="container">
      {#key items}
        {#each items as item, index}
          <Item {item} {index} on:use={useItem} on:destroy={destroyItem} />
        {/each}
      {/key}
    </div>
  </div>
</main>

<style>
  .inventory {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    background: gray;
    background-size: 50%;
    border-radius: 10px;
    border: 5px outset gray;
    width: min-content;
    transition: 1s;
    overflow: hidden;
    height: 450px;
  }

  .container {
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
</style>
