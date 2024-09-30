<script lang="ts">
  import type { Item as ItemType } from '../interfaces/inventory';
  import Item from './Item.svelte';
  import { createEventDispatcher } from 'svelte';
  import type { Player } from '../interfaces/user';

  export let hero: Player;

  const dispatch = createEventDispatcher();

  let container: HTMLDivElement;

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
    hero.items[item.index] = {};
  }

  function changeAttribByEquip(item) {
    //tech debt - attrib infinite increase
    console.log('Hero: ', hero);
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
  }

  function equip(item: ItemType) {
    let aux = hero.equip[item.type];
    hero.equip[item.type] = item;
    hero.items[item.index] = aux;
    changeAttribByEquip(item);
    dispatch('equipItem', {
      equip: item,
    });
    alert(`${item.icon}${item.name} equipped!`);
  }

  function getEquipDisplay(equip: ItemType) {
    if (!equip) return 'Nothing...';

    return equip.icon + ' ' + equip.name;
  }

  function change() {
    dispatch('change', {
      div: this.nextSibling.nextSibling,
      height: '300px',
      padding: '0px',
    });
  }
</script>

<main class="menu-box">
  <h2 on:click={change}>🧳 Inventory</h2>
  <div class="inventory" bind:this={container}>
    <div class="equipments">
      <div>{getEquipDisplay(hero.equip.weapon)}</div>
      <div>{getEquipDisplay(hero.equip.armor)}</div>
      <div>{getEquipDisplay(hero.equip.misc)}</div>
    </div>
    <div class="container">
      {#key hero.items}
        {#each hero.items as item, index}
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
    width: 100%;
    transition: 1s;
    overflow: hidden;
    height: 300px;
  }

  .container {
    padding: 5px;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(5, 50px);
    grid-template-rows: repeat(2, 50px);
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
