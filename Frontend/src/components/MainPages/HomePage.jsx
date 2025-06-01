import NavBar from "../Layout/NavBar";
import HeroSection from "../Home/HeroSection";
import ProductList from "../Home/ProductList";
import FloatingWishlist from "../Layout/FloatingWishList";

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

    </div>
  );
};

export default HomePage;