<script lang="ts">
  import type { Item } from "../interfaces/inventory";

  import { createEventDispatcher } from "svelte";

  export let item: Item;
  export let index: number;

  const dispatch = createEventDispatcher();

  function getIcon(): string {
    return item.icon ? item.icon : "";
  }

  function isConsumable(): boolean {
    return item.type === "consumable";
  }

  function useItem(): void {
    dispatch("use", { item });
    if (isConsumable()) destroy();
  }

  function destroy(): void {
    dispatch("destroy", { item });
    item = {};
  }

  item.index = index;
</script>

<div class="cell" on:click={useItem}>
  {getIcon()}
</div>

<style>
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 5px inset rgb(167, 167, 167);
    border-radius: 2px;
    width: 35px;
    height: 35px;
    font-size: 1rem;
    background-color: rgb(247, 247, 247);
    cursor: pointer;
  }
</style>
