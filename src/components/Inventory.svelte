<script lang="ts">
  import Item from "./Item.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { initialCollapse } from "../utils/collapse";

  export let hero;
  export let items;

  const dispatch = createEventDispatcher();

  let base = {
    power: hero.power,
    guard: hero.guard,
    speed: hero.speed,
  };

  let equipments = {
    weapon: {},
    armor: {},
    misc: {},
  };

  let container;

  onMount(() => {
    initialCollapse(container);
  });

  function useItem(event) {
    const { item } = event.detail;
    if (item.type === "consumable") consume(item);
    if (item.type === "weapon" || item.type === "armor" || item.type === "misc")
      equip(item);
  }

  function consume(item) {
    const maxLife = hero.level * 10;
    hero.life += item.attrib.life ? item.attrib.life : 0;
    hero.life = hero.life >= maxLife ? maxLife : hero.life;
    alert(`${item.icon}${item.name} used!`);
  }

  function destroyItem(event) {
    const { item } = event.detail;
    items[item.index] = {};
  }

  function equip(item) {
    let aux = equipments[item.type];
    equipments[item.type] = item;
    items[item.index] = aux;

    switch (item.type) {
      case "weapon":
        hero.power = base.power + item.attrib.power;
        break;
      case "armor":
        hero.guard = base.guard + item.attrib.guard;
        break;
      case "speed":
        hero.speed = base.speed + item.attrib.speed;
        break;
    }
    alert(`${item.icon}${item.name} equipped!`);
  }

  function getEquipDisplay(equip) {
    if (equip.name === undefined) return "Empty slot...";

    return equip.icon + " " + equip.name;
  }

  function change() {
    dispatch("change", {
      div: this.nextSibling.nextSibling,
      height: "450px",
      padding: "0px",
    });
  }
</script>

<main>
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
  main {
    width: 270px;
  }

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

  @keyframes collapseHeight {
    0% {
      height: 0;
    }

    100% {
      height: fit-content;
    }
  }
</style>
