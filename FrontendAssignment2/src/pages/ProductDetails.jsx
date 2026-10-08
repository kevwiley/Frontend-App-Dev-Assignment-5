import { useParams } from "react-router-dom";

function ProductDetails({ products }) {
    const { id } = useParams();

    //same product clicked will be on details page
    const product = products.find(
        (product) => product.id === Number(id)
    );

    //ensures the product actually exists
    if (!product) {
        return <h1>Product Not Found</h1>;
    }

    return (
        <div className="product-detail">
            <img src={product.image} alt={product.name}/>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>${product.price}</p>
        </div>
    );
}

export default ProductDetails;