import React, { useEffect, useRef, useState } from "react";
import "../../styles/CartPreview.css";
import { fetchCartItems } from "../../services/fetchCartItems";
import { useNavigate } from "react-router-dom";

const CartPreview = ({ setShowCartPreview, showCartPreview }) => {
  const [cartItems, setCartItems] = useState([]);
  const cartPreviewRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const items = await fetchCartItems();
        setCartItems(items);
      } catch (error) {
        console.error("Error al cargar los datos del carrito:", error);
      }
    };

    loadCartItems();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartPreviewRef.current && !cartPreviewRef.current.contains(event.target)) {
        setShowCartPreview(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowCartPreview]);

  return (
    <div
      className={`cart-preview ${showCartPreview ? "open" : ""}`} // Agregar clase dinámica
      ref={cartPreviewRef}
    >
      <h3>Carrito de Compras</h3>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">{item.price}€</p>
                <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
              </div>
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