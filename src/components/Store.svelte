<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { initialCollapse } from "../utils/collapse";

  export let gold: number;
  export let items;

  const dispatch = createEventDispatcher();

  let container;
  let products = [
    {
      active: true,
      icon: "🍎",
      name: "Apple",
      type: "consumable",
      description: "Recupera a vida.",
      attrib: { life: 5 },
      price: 0,
      level: 1,
    },
    {
      active: true,
      icon: "🍌",
      name: "Banana",
      type: "consumable",
      description: "Recupera a vida.",
      attrib: { life: 5 },
      price: 1,
      level: 1,
    },
    {
      active: true,
      icon: "🔧",
      name: "Wrench",
      type: "weapon",
      description: "Equipamento.",
      attrib: { power: 1 },
      price: 1,
      level: 1,
    },
    {
      active: true,
      icon: "🔨",
      name: "Hammer",
      type: "weapon",
      description: "Equipamento.",
      attrib: { power: 2 },
      price: 1,
      level: 1,
    },
  ];

  onMount(() => {
    initialCollapse(container);
  });

  function handleBuyItem(product) {
    if (gold < product.price) {
      alert("Not enough gold");
    }

    const emptySlotIndex = items.indexOf(items.find((item) => !item.name));
    if (emptySlotIndex === -1) {
      return alert("Inventory is Full!");
    }
    buyItem(product, emptySlotIndex);
  }

  function change() {
    dispatch("change", {
      div: this.nextSibling.nextSibling,
      height: "300px",
      padding: "10px",
    });
  }

  function buyItem(product, index) {
    items[index] = product;
    gold -= product.price;
    dispatch("buy", { items, gold });
  }
</script>

<main>
  <h2 on:click={change}>💰 Market</h2>
  <div class="container" bind:this={container}>
    <div class="products">
      {#each products as product}
        {#if product.active}
          <div class="product">
            <div>
              {product.icon}
              {product.name}
            </div>
            <div>
              ${product.price}.00
              <div class="button" on:click={() => handleBuyItem(product)}>
                Buy!
              </div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</main>

<style>
  main {
    width: 270px;
  }

  .container {
    display: flex;
    height: fit-content;
    border: 5px dotted lightgray;
    padding: 10px;
    background-color: rgba(105, 105, 105, 0.646);
    transition: 1s;
    overflow: hidden;
    height: 300px;
  }

  .products {
    display: flex;
    flex-direction: column;
    text-align: left;
    border-radius: 5px;
    height: fit-content;
    scroll-behavior: auto;
    width: 220px;
  }

  .product {
    display: flex;
    margin: 10px;
    padding: 5px;
    border-radius: 10px;
    background: lightgoldenrodyellow;
    font-family: "Lobster";
    justify-content: space-between;
    align-items: center;
    user-select: none;
  }

  .product > div {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
  }

  .button {
    padding: 10px 5px;
    border-radius: 15px;
    margin-left: 10px;
    background: linear-gradient(white, grey);
    cursor: pointer;
  }
</style>
