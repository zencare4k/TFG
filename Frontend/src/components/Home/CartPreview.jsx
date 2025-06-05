import React, { useEffect, useRef, useState, useContext } from "react";
import "../../styles/CartPreview.css";
import { useNavigate } from "react-router-dom";
import { fetchCartItems, removeFromCart } from "../../services/cart_API";
import { AuthContext } from "../context/AuthContext";

const CartPreview = ({ setShowCartPreview, showCartPreview }) => {
  const cartPreviewRef = useRef(null);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [removingItem, setRemovingItem] = useState(null);
  const { user } = useContext(AuthContext);

  // Cargar carrito solo del backend
  useEffect(() => {
    const loadCart = async () => {
      if (user && user._id) {
        const items = await fetchCartItems(user._id);
        // Filtrar duplicados por productId (por si acaso)
        const uniqueItems = [];
        const seen = new Set();
        for (const item of items) {
          if (!seen.has(item.productId)) {
            uniqueItems.push(item);
            seen.add(item.productId);
          }
        }
        setCartItems(uniqueItems);
      } else {
        setCartItems([]); // Si no hay usuario, el carrito está vacío
      }
    };
    if (showCartPreview) loadCart();
  }, [showCartPreview, user]);

  const handleRemoveItem = async (productId) => {
    setRemovingItem(productId);
    setTimeout(async () => {
      try {
        if (user && user._id) {
          await removeFromCart(String(user._id), String(productId));
          const items = await fetchCartItems(user._id);
          // Filtrar duplicados por productId (por si acaso)
          const uniqueItems = [];
          const seen = new Set();
          for (const item of items) {
            if (!seen.has(item.productId)) {
              uniqueItems.push(item);
              seen.add(item.productId);
            }
          }
          setCartItems(uniqueItems);
        }
        setRemovingItem(null);
      } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
      }
    }, 300);
  };

  return (
    <div
      className={`cart-preview ${showCartPreview ? "open" : ""}`}
      ref={cartPreviewRef}
    >
      <h3>Carrito de Compras</h3>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li
              key={item.productId || item._id || index}
              className={`cart-item ${removingItem === (item.productId || item._id) ? "removing" : ""}`}
            >
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">{item.price}€</p>
                <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
              </div>
              <button
                className="remove-item-button"
                onClick={() => handleRemoveItem(item.productId)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      <button className="view-cart-button" onClick={() => navigate("/cart")}>
        Ver Carrito
      </button>
    </div>
  );
};

export default CartPreview;