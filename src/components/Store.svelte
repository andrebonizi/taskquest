<script>
    let products = [
        { active: true, element: 'Apple', price: 1, level: 1, icon: '🍎' },
        { active: true, element: 'Banana', price: 1, level: 1, icon: '🍌' },
        { active: true, element: 'Wrench', price: 1, level: 1, icon: '🔧' },
        { active: true, element: 'Hammer', price: 1, level: 1, icon: '🔨' },
        { active: true, element: 'Knife', price: 1, level: 1, icon: '🔪' },
        { active: true, element: 'Shirt', price: 1, level: 1, icon: '👕' },
        { active: true, element: 'Mallet', price:1, level: 1, icon: '👘' },
    ];
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
                    {product.icon} {product.element} 
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