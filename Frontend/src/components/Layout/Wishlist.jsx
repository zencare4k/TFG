import React from "react";
import "../../styles/Wishlist.css";

const Wishlist = ({ wishlistItems = [], setShowWishlist, onRemoveFromWishlist }) => {
  return (
    <div className="wishlist">
      <h3>Tu Lista de Deseados</h3>
      {wishlistItems.length === 0 ? (
        <p>No tienes productos en tu lista de deseos</p>
      ) : (
        <ul>
          {wishlistItems.map((item) => (
            <li key={item._id}>
              <img src={item.imageUrl} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>{item.price}€</p>
                <button onClick={() => onRemoveFromWishlist(item._id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => setShowWishlist(false)}>Cerrar</button>
    </div>
  );
};

export default Wishlist;