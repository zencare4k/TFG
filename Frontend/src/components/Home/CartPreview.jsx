import React, { useEffect, useRef, useState } from "react";
import "../../styles/CartPreview.css";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../../services/cart_API";

const CartPreview = ({ cartItems = [], setCartItems, setShowCartPreview, showCartPreview }) => {
  const cartPreviewRef = useRef(null);
  const navigate = useNavigate();
  const [removingItem, setRemovingItem] = useState(null); // Estado para manejar la animación de eliminación

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

  const handleRemoveItem = async (productId) => {
    setRemovingItem(productId); // Activar la animación de eliminación
    setTimeout(async () => {
      try {
        await removeFromCart(productId); // Llamar al servicio para eliminar el producto
        setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId)); // Actualizar el estado
        setRemovingItem(null); // Resetear el estado de eliminación
      } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
      }
    }, 300); // Tiempo de la animación
  };

  return (
    <div
      className={`cart-preview ${showCartPreview ? "open" : ""}`} // Mostrar solo si está abierto
      ref={cartPreviewRef}
    >
      <h3>Carrito de Compras</h3>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li
              key={index}
              className={`cart-item ${removingItem === item.productId ? "removing" : ""}`}
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