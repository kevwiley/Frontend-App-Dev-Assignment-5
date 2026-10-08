import ProductCard from "../components/ProductCard";

//product page will have product cards listed out with an add to cart and details button
function ProductsPage({ products, addToCart }) {
    return (
        <div className="products-page">
            <h1>Great Deals</h1>
            {/* Create a ProductCard for each product */}
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart}/>
            ))}
        </div>
    );
}

export default ProductsPage;

