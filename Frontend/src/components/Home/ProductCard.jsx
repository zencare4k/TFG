import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/products.css";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate(`/product/${product._id}`); // Redirige a la página de detalles del producto
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
    </div>
  );
};

export default ProductCard;