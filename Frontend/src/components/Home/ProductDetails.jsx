import React from "react";
import { useParams } from "react-router-dom";
import "../../styles/products.css";

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className="product-details">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.src = "/assets/images/default-product.png";
        }}
      />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>
        <span className="original-price">{product.originalPrice}€</span>
        <span className="discounted-price">{product.price}€</span>
      </p>
      <button className="buy-button">Comprar Ahora</button>
    </div>
  );
};

export default ProductDetails;