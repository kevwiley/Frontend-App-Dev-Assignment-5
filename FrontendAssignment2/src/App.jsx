import './App.css' 
import Header from "./components/Header";
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ProductDetails from "./pages/ProductDetails";
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';

//each card will be listed out vertically, with image, name, price, and description.
function App() {

  const products = [

    { 
      id: 1, 
      name: "Wireless Headphones", 
      price: 99.99, 
      image: "https://placehold.co/600x400",
      description: "Premium noise-cancelling headphones with 30-hour battery life"
    },
    { 
      id: 2, 
      name: "Smart Watch", 
      price: 249.99, 
      image: "https://placehold.co/600x400",
      description: "Fitness tracker with heart rate monitor and GPS"
    },
    { 
      id: 3, 
      name: "Bluetooth Speaker", 
      price: 79.99, 
      image: "https://placehold.co/600x400",
      description: "Portable waterproof speaker with 360-degree sound"
    },
    { 
      id: 4, 
      name: "Laptop Stand", 
      price: 49.99, 
      image: "https://placehold.co/600x400",
      description: "Ergonomic aluminum stand for laptops and tablets"
    },
    { 
      id: 5, 
      name: "Webcam", 
      price: 129.99, 
      image: "https://placehold.co/600x400",
      description: "4K webcam with auto-focus and noise reduction"
    },
    { 
      id: 6, 
      name: "Mechanical Keyboard", 
      price: 159.99, 
      image: "https://placehold.co/600x400",
      description: "RGB backlit keyboard with custom switches"
    }
  ];

  //store items currently in cart array, with local storage
  const [cart, setCartcount] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      console.warn("Could not load cart from localStorage");
      return [];
    }
  });

  //allows data to be saved whenever post state changes, makes sure there are no errors
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.warn("Could not save cart to localStorage", error);
    }
  }, [cart]);


  //adds item to cart
  function addToCart(product) {
    setCartcount([...cart, product]);
    console.log("Added to cart:", product);
  }

  //removes item from cart
  function removeFromCart(productId) {
    setCartcount(cart.filter((product) => product.id !== productId));
  }

  //routes will lead to each function, links will be in the header. Link to product details will be on products page on product card
  return (
  <BrowserRouter>
      <div className="app">
        <Header storeName="TechShop" cartCount={cart.length}/>

        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/products" element={<ProductsPage products={products} addToCart={addToCart}/>}/>
          <Route path="/cart" element={<CartPage products={cart} removeFromCart={removeFromCart}/>}/>
          <Route path="/products/:id" element={<ProductDetails products={products}/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/faq" element={<FAQPage/>}/>
        </Routes>

        <Footer shopName="TechShop" email="test@test.test" phone="123-456-7890" address="1234 Test Lane"/>
      </div>
    </BrowserRouter>
  );
}

export default App;