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
        {#if (product.active)}
            <div class="product">
                <div>
                    {product.element}
                </div>
                <div>
                    ${product.price}.00
                    <div class="button">Buy!</div>    
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
        flex: 1
    }
    .products{
        display: flex;
        flex-direction: column;
        text-align: left;
        background: linear-gradient(coral, grey);
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
        width: 30px;
        border-radius: 15px;
      
        margin-left: 10px;
        background: linear-gradient(white, grey);
        cursor: pointer;
    }
</style>