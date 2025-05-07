import React from "react";
import NavBar from "../Layout/NavBar";
import HeroSection from "../Home/HeroSection";
import ProductList from "../Home/ProductList";
import FloatingWishlist from "../Layout/FloatingWishList";
import Footer from "../Layout/Footer";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Barra de navegación */}
      <NavBar />

      {/* Sección principal con el carrusel */}
      <HeroSection />

      {/* Lista de productos */}
      <ProductList />

      {/* Wishlist flotante */}
      <FloatingWishlist />

      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default HomePage;