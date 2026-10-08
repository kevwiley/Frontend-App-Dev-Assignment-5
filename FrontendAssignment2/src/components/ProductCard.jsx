import "./ProductCard.css"
import { Link } from "react-router-dom";

//product card has image on top, the name, description and price under it. Will have add to cart and details button
function ProductCard({ product, onAddToCart }) {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image"/>
            <div className="product-info">

                <h2>{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>

                <button onClick={() => onAddToCart(product)}>Add to Cart</button>

                <Link to ={`/products/${product.id}`}>
                    <button>Details</button>
                </Link>

            </div>
        </div>
    );
}

export default ProductCard;