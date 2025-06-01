import React from "react";
import "../../styles/Wishlist.css";

const Wishlist = ({ wishlistItems = [], setShowWishlist, onRemoveFromWishlist, error }) => {
  return (
    <div className="wishlist">
      <h3>Tu Lista de Deseados</h3>
      {error && <p className="error">{error}</p>}
      {wishlistItems.length === 0 && !error ? (
        <p>No tienes productos en tu lista de deseos</p>
      ) : (
<ul>
  {wishlistItems.map((product, idx) => (
    <li key={product._id || idx}>
      <img
        src={product.imageUrl || product.image || "/assets/img/default.png"}
        alt={product.name || "Producto"}
        style={{ width: 50, height: 50, objectFit: "cover" }}
      />
      <div>
        <p>{product.name || "Sin nombre"}</p>
        <p>{product.price ? `${product.price}€` : ""}</p>
        <button onClick={() => onRemoveFromWishlist(product._id)}>Eliminar</button>
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