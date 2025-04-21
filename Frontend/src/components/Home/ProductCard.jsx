import React from "react";
import "../../styles/products.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl} // Asegúrate de que este campo coincida con el nombre en la base de datos
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.src = "/assets/images/default-product.png"; // Imagen por defecto si falla la carga
        }}
      />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">
        <span className="original-price">{product.originalPrice}€</span>
        <span className="discounted-price">{product.price}€</span>
      </p>
      <button className="buy-button">Comprar</button>
    </div>
  );
};

export default ProductCard;