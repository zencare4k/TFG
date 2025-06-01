import React, { useState, useEffect, useCallback } from "react";
import Wishlist from "./Wishlist";

import "../../styles/FloatingWishlistIcon.css";
import { fetchWishlist, removeFromWishlist } from "../../services/wishlist_API";

const FloatingWishlistIcon = ({ userId }) => {
  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState("");

  const loadWishlist = useCallback(async () => {
    if (!userId) {
      setWishlistItems([]);
      return;
    }
    try {
      const data = await fetchWishlist(userId.toString());
      const normalized = Array.isArray(data)
        ? data.map(item => item.product ? item.product : item)
        : [];
      setWishlistItems(normalized);
      setError("");
    } catch (error) {
      setWishlistItems([]);
      setError("No se pudo cargar la wishlist.");
    }
  }, [userId]);

  useEffect(() => {
    if (showWishlist && userId) {
      loadWishlist();
    }
  }, [showWishlist, loadWishlist, userId]);

  const handleWishlistIconClick = () => {
    if (!userId) return; // No permitir abrir si no hay usuario
    setShowWishlist((prev) => !prev);
  };

  const handleRemoveFromWishlist = async (productId) => {
    if (!userId) return;
    try {
      await removeFromWishlist(userId, productId);
      loadWishlist();
    } catch (error) {
      setError("No se pudo eliminar el producto.");
    }
  };

  if (!userId) return null; // No renderizar nada si no hay usuario

  return (
    <>
      <div className="floating-wishlist-icon" onClick={handleWishlistIconClick}>
        <img src="/assets/icons/wishlist.png" alt="Wishlist" />
      </div>
      {showWishlist && (
        <div className="floating-wishlist-modal">
          <Wishlist
            wishlistItems={wishlistItems}
            setShowWishlist={setShowWishlist}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            error={error}
          />
        </div>
      )}
    </>
  );
};

export default FloatingWishlistIcon;