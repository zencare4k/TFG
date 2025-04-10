import React from "react";
import "../../styles/products.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
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