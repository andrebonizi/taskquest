<script>
    let products = [
        { active: true, element: 'Apple', price: 1, level: 1 },
        { active: true, element: 'Banana', price: 1, level: 1 },
        { active: true, element: 'Wrench', price: 1, level: 1 },
        { active: true, element: 'Hammer', price: 1, level: 1 },
        { active: true, element: 'Knife', price: 1, level: 1 },
        { active: true, element: 'Shirt', price: 1, level: 1 },
        { active: true, element: 'Mallet', price:1, level: 1 },
    ];
</script>

<div class="container">
    <div class="title">
        Market
    </div>
    <hr>
    <div class="products">
    {#each products as product}
        {#if (product && product.active)}
            <div class="product">
                <div>
                    {product.element}
                </div>
                <div>
                    {product.price}
                </div>
            </div>    
        {/if}
    {/each}
    </div>
</div>

<style>
    .container{
        width: 550px;
        height: 100%;
        border: 5px dotted lightgray;
        padding: 10px;
    }
    .products{
        display: flex;
        flex-direction: column;
        text-align: left;
        background: coral;
        border-radius: 5px;
        height: 500px;
        scroll-behavior: auto;
    }
    .product{
        display: flex;
        margin: 10px;
        padding-left: 10px;
        padding-right: 20px;
        border-radius: 10px;
        background: lightgoldenrodyellow;
        font-family: 'Lobster';
        justify-content: space-between;
    }
    .title{
        font-weight: bolder;
        font-size: 2rem;
        font-family: 'Lobster';
    }
</style>