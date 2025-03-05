import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/NavBar';
import Herosection from './components/Home/HeroSection';
import ContentList from './components/Home/ProductList';
import ProductFilter from './components/Home/ProductFilter';
import CartPage from './components/Home/CartPage';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm';
// Eliminar la siguiente línea
// import WeatherPage from './components/AEMET/WeatherPage';
import CostumerChat from './components/Home/CostumerChat';
import SupportPage from './components/Support/SupportPage';
import FloatingWishlistIcon from './components/Layout/FloatingWishList';
import { fetchProducts, addToMockupCart, getMockupCart, toggleWishlist } from './services/product_API';

const NotFound = () => <h2>404 Not Found</h2>;

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(products => {
      setProducts(products);
      setFilteredProducts(products);
    });
  }, []);

  const handleAddToCart = (product) => {
    addToMockupCart(product);
    setCartItems(getMockupCart());
  };

  const handleAddToWishlist = (product) => {
    toggleWishlist(product.id);
    setProducts(prevProducts => {
      return prevProducts.map(p => 
        p.id === product.id ? { ...p, inWishlist: !p.inWishlist } : p
      );
    });
    setWishlistItems(prevItems => {
      const isInWishlist = prevItems.some(item => item.id === product.id);
      if (isInWishlist) {
        return prevItems.filter(item => item.id !== product.id);
      } else {
        return [...prevItems, product];
      }
    });
  };

  const handleRemoveFromWishlist = (product) => {
    toggleWishlist(product.id);
    setProducts(prevProducts => {
      return prevProducts.map(p => 
        p.id === product.id ? { ...p, inWishlist: false } : p
      );
    });
    setWishlistItems(prevItems => {
      return prevItems.filter(item => item.id !== product.id);
    });
  };

  const handleFilter = ({ name, minPrice, maxPrice }) => {
    const filtered = products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(name.toLowerCase());
      const price = parseFloat(product.price.replace('€', ''));
      const matchesMinPrice = minPrice === "" || price >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === "" || price <= parseFloat(maxPrice);
      return matchesName && matchesMinPrice && matchesMaxPrice;
    });
    setFilteredProducts(filtered);
  };

  return (
    <Router>
      <div>
        <header>
          <Header cartItems={cartItems} />
        </header>
        
        <main style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <Routes>
            <Route path="/" element={
              <>
                <Herosection />
                <ProductFilter products={products} onFilter={handleFilter} />
                <ContentList products={filteredProducts} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />
              </>
            } />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            {/* Eliminar la siguiente línea */}
            {/* <Route path="/weather" element={<WeatherPage />} /> */}
            <Route path="/support" element={<SupportPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <footer>
          <Footer />
        </footer>

        <CostumerChat />
        <FloatingWishlistIcon wishlistItems={wishlistItems} onRemoveFromWishlist={handleRemoveFromWishlist} />
      </div>
    </Router>
  );
}

export default App;