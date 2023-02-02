<script>
    import { createEventDispatcher } from 'svelte';
    export let gold
    const dispatch = createEventDispatcher();

    let products = [
        {active: true, icon: '🍎', name: 'Apple', type: 'consumable', description: 'Recupera a vida.', attrib:{life:5}, price: 1, level: 1 },
        {active: true, icon: '🍌', name: 'Banana', type: 'consumable', description: 'Recupera a vida.', attrib:{life:5},  price: 1, level: 1},
        {active: true, icon: '🔧', name: 'Wrench', type: 'weapon', description: 'Equipamento.', attrib: {power:1},  price: 1, level: 1},
        {active: true, icon: '🔨', name: 'Hammer', type: 'weapon', description: 'Equipamento.', attrib: {power:2},  price: 1, level: 1},
    ];

    function handleBuyItem(product){
        delete product.active
        return gold >= product.price ?  dispatch('buyItem', {product}) : alert('Not enough gold')
    }

</script>

<div class="container">
    <div class="title">
        Market 💰
    </div>
    <div class="products">
    {#each products as product}
        {#if (product.active)}
            <div class="product">
                <div>
                    {product.icon} {product.name} 
                </div>
                <div>
                    ${product.price}.00
                    <div class="button" on:click={() => handleBuyItem(product)}>Buy!</div>    
                </div>
            </div>
        {/if}
    {/each}
    </div>
</div>

<style>
    .container{
        width: 100%;
        height: 100%;
        border: 5px dotted lightgray;
        padding: 10px;
        flex: 1;
        background-color: rgba(105, 105, 105, 0.646); 
    }
    .products{
        display: flex;
        flex-direction: column;
        text-align: left;
        border-radius: 5px;
        height: 500px;
        scroll-behavior: auto;
    }
    .product{
        display: flex;
        margin: 10px;
        padding: 5px;
        border-radius: 10px;
        background: lightgoldenrodyellow;
        font-family: 'Lobster';
        justify-content: space-between;
        align-items: center;
        user-select: none;
    }
    .product > div{
        display: flex;
        align-items: center;
        justify-content: center;
        justify-content: space-between;
    }
    .title{
        font-weight: bolder;
        font-size: 2rem;
        font-family: 'Lobster';
    }
    .button{
        padding: 10px 5px;
        border-radius: 15px;
        margin-left: 10px;
        background: linear-gradient(white, grey);
        cursor: pointer;
    }
</style>