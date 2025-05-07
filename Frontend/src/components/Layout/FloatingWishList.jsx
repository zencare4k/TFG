import React, { useState, useEffect } from "react";
import Wishlist from "./Wishlist";
import "../../styles/FloatingWishlistIcon.css";
import { fetchWishlist } from "../../services/wishlist_API";

const FloatingWishlistIcon = ({ userId, onRemoveFromWishlist }) => {
  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const data = await fetchWishlist(userId); // Cargar la wishlist desde el backend
        setWishlistItems(data);
      } catch (error) {
        console.error("Error al cargar la wishlist:", error);
      }
    };

    if (showWishlist) {
      loadWishlist();
    }
  }, [showWishlist, userId]);

  const handleWishlistIconClick = () => {
    setShowWishlist(!showWishlist);
  };

  return (
    <div>
      <div className="floating-wishlist-icon" onClick={handleWishlistIconClick}>
        <img src="/assets/icons/wishlist.png" alt="Lista de deseos" />
      </div>
      {showWishlist && (
        <Wishlist
          wishlistItems={wishlistItems}
          setShowWishlist={setShowWishlist}
          onRemoveFromWishlist={onRemoveFromWishlist}
        />
      )}
    </div>
  );
};

export default FloatingWishlistIcon;