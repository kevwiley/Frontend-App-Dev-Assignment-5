import CartItem from "../components/CartItem";

//cart page function, will show products and total price
function CartPage({ products, removeFromCart }) {

    //finds total price of items currently in cart
    const cartTotal = products.reduce((total, product) => {
        return total + product.price;
    }, 0);

    return (
        <section className="cart">
            <h2>Shopping Cart</h2>

            {products.length === 0 ? (
                <p>Cart is Empty</p>
            ) : (
                products.map((product) => (
                    <CartItem key={product.id} product={product} onRemove={removeFromCart}/>
                ))
            )}
            <h3>Total: ${cartTotal.toFixed(2)}</h3>
        </section>
    );
}

export default CartPage;

