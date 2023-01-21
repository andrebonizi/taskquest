<script lang='ts'>
  import { createEventDispatcher } from 'svelte';

  interface Item {
    icon?: string;
    name?: string;
    type?: string;
    description?: string;
    attrib?: Object;
    index?: number;
  }
  
  export let item: Item;
  export let index: number;

  item.index = index;
  const dispatch = createEventDispatcher();

  function getIcon(): string {
    return item.icon? item.icon: '';
  }

  function useItem() {
    dispatch('use', {
      item
    })
    if (item.type === 'consumable') destroy()
  }

  function destroy() {
    dispatch('destroy', {
      item
    })
    item = {}
  }
</script>

<div class="cell" on:click={()=>{useItem()}} >
  {getIcon()}
</div>

<style>
  .cell{
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