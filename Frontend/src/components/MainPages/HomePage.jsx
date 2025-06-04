import NavBar from "../Layout/NavBar";
import HeroSection from "../Home/HeroSection";
import ProductList from "../Home/ProductList";
import FloatingWishlist from "../Layout/FloatingWishList";
import Recommendations from "../Shared/Recommendations";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Barra de navegación */}
      <NavBar />
      {/* Sección principal con el carrusel */}
      <HeroSection />
      {/* Lista de productos */}
      <ProductList />
      {/* Recomendaciones resaltadas */}
      <Recommendations />
      {/* Wishlist flotante */}
      <FloatingWishlist />
    </div>
  );
};

export default HomePage;