import React, { useState, useEffect, useRef } from 'react';
import '../../styles/FloatingWishlistIcon.css';

const Wishlist = ({ wishlistItems, setShowWishlist, onRemoveFromWishlist }) => {
  const [items, setItems] = useState(wishlistItems);
  const wishlistRef = useRef(null);

  // Manejar clics fuera del Wishlist para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
        setShowWishlist(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowWishlist]);

  const handleRemoveItem = (index) => {
    const itemToRemove = items[index];
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onRemoveFromWishlist(itemToRemove);
  };

  return (
    <div className="wishlist" ref={wishlistRef}>
      <h3>Lista de Deseos</h3>
      {items.length === 0 ? (
        <p>La lista de deseos está vacía</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <img src={item.image} alt={item.name} className="wishlist-item-image" />
              <div className="wishlist-item-details">
                <p className="wishlist-item-name">{item.name}</p>
                <p className="wishlist-item-price">{item.price}</p>
                <button onClick={() => handleRemoveItem(index)} className="remove-item-button">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button className="close-wishlist-button" onClick={() => setShowWishlist(false)}>Cerrar</button>
    </div>
  );
};

export default Wishlist;