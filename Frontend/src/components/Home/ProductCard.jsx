import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/products.css";
import "../../styles/Wishlist.css"; // Asegúrate de tener este archivo CSS para los estilos

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.src = "/assets/images/default-product.png";
        }}
        onClick={handleViewDetails}
        style={{ cursor: "pointer" }}
      />
      <h2>{product.name}</h2>
      <p>{product.price}€</p>
      <div className="product-card-buttons">
        <button className="add-to-cart-button" onClick={() => onAddToCart(product)}>
          Añadir al Carrito
        </button>
        <button className="buy-now-button" onClick={handleBuyClick}>
          Comprar Ahora
        </button>
      </div>
      <button
        className="wishlist-button"
        onClick={() => onAddToWishlist(product)}
        title="Añadir a la lista de deseados"
      >
        <img
          src="/assets/icons/wishlist_card.png"
          alt="Añadir a la lista de deseados"
          className="wishlist-icon"
        />
      </button>
      <button className="view-details-button" onClick={handleViewDetails}>
        Ver detalles
      </button>
    </div>
  );
};

export default ProductCard;