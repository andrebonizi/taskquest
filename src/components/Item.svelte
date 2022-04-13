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
    border: 5px inset gray;
    border-radius: 2px;
    width: 30px;
    height: 30px;
    font-size: 1.5rem;
    background-color: lightgray;
    cursor: pointer;
  }
</style>