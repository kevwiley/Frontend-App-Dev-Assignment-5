import "./Header.css";
import { Link } from "react-router-dom";

//header will have a home, products, about, and contacts section may be made buttons in the future
function Header({storeName, cartCount}) {
    return (
        <header className="header">
            <h1>{storeName}</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/about">About</Link>
            </nav>
            <div className="cart-container">
                <Link to="/cart">
                    <span className="cart-icon">🛒</span>
                    <span className="cart-count">{cartCount}</span>
                </Link>
            </div>
        </header>
    );
}

export default Header;