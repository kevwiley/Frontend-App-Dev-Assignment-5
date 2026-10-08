import "./Hero.css";
import { Link } from "react-router-dom";

//will have a title, with subtitle and a button with link to products
function Hero({title, subtitle, calltoaction }) {
    return(
        <section className="hero">
            <div className="hero-content">
                <h1>{title}</h1>
                <p>{subtitle}</p>
                <Link to ="/products">
                    <button>{calltoaction}</button>
                </Link>
            </div>
        </section>
    );
}

export default Hero;