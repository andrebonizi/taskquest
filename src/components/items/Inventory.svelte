<script lang="ts">
  import type { Item as ItemType } from '../../interfaces/inventory';
  import type { Player } from '../../interfaces/user';

  import Item from './Item.svelte';

  import { ATTRIBS } from '../../data/player';
  import { createEventDispatcher, onMount } from 'svelte';
  import { EQUIP_TYPES } from '../../data/items';
  import { initialCollapse } from '../../utils/collapse';

  export let hero: Player;

  const dispatch = createEventDispatcher();

  let container: HTMLDivElement;

  function useItem(event: CustomEvent) {
    const { item } = event.detail;
    if (item.type === 'consumable') consume(item);
    if (EQUIP_TYPES.includes(item.type)) equip(item);
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

  function changeAttrib(item: ItemType, current: ItemType): void {
    if (item.name === 'Nothing...' || item.type === 'consumable') return;

    ATTRIBS.forEach((a) => {
      hero[a] -= current.attrib[a] || 0;
      hero[a] += item.attrib[a] || 0;
    });
  }

  function swapEquip(equip: ItemType): ItemType {
    const current = hero.equip[equip.type];
    hero.equip[equip.type] = equip;
    hero.items[equip.index] = current;
    return current;
  }

  function equip(item: ItemType) {
    changeAttrib(item, swapEquip(item));
    dispatch('equipItem', { item: item });
    alert(`${item.icon}${item.name} equipped!`);
  }

  function getEquipDisplay(equip: ItemType) {
    return !equip ? 'Nothing...' : equip.icon + ' ' + equip.name;
  }

  function change() {
    dispatch('change', {
      div: this.nextSibling.nextSibling,
      height: '300px',
      padding: '0px',
    });
  }

  onMount(() => {
    initialCollapse(container);
  });
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
