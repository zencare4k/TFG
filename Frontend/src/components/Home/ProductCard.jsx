import React from 'react';
import ProductRating from './ProductRating';
import OpenConfiguratorButton from '../Shared/OpenConfiguratorButton';
import '../../styles/products.css';

const ProductCard = ({ product, onAddToCart, onLikeUpdate, onSelectForComparison, onAddToWishlist }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">
        <span className="original-price">{product.originalPrice}</span>
        <span className="discounted-price">{product.price}</span>
      </p>
      <ProductRating product={product} onLikeUpdate={onLikeUpdate} />
      <OpenConfiguratorButton product={product} addToCart={onAddToCart} />
      <button onClick={() => onSelectForComparison(product)} className="compare-button">
        Seleccionar para comparar
      </button>
      <button 
        onClick={() => onAddToWishlist(product)} 
        className={`wishlist-button ${product.inWishlist ? 'in-wishlist' : ''}`}
      >
        {product.inWishlist ? 'En la lista de deseos' : 'Añadir a la lista de deseos'}
      </button>
    </div>
  );
};

export default ProductCard;