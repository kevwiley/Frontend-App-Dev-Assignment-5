import "./CartItem.css";

//displays item, price and a button
function CartItem({ product, onRemove}) {
    return (
        <div className="cart-item">
            <div className="cart-item-info">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
            </div>

            <button onClick={() => onRemove(product.id)}>
                Remove
            </button>
        </div>
    );
}

export default CartItem;