import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CartPage.css";
import { fetchCartItems, removeFromCart } from "../../services/cart_API";
import Recommendations from "../Shared/Recommendations"; // <-- Importa el componente

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [removingItem, setRemovingItem] = useState(null);
  const navigate = useNavigate();

const handleQuantityChange = (productId, newQuantity) => {
  if (newQuantity < 1) return;
  setCart((prevItems) =>
    prevItems.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    )
  );
};
  useEffect(() => {
    const loadCartData = async () => {
      try {
        const cartItems = await fetchCartItems();
        setCart(cartItems);
      } catch (error) {
        console.error("Error al cargar los datos del carrito:", error);
      }
    };

    loadCartData();
  }, []);

const handleRemoveItem = async (productId) => {
  setRemovingItem(productId);
  setTimeout(async () => {
    try {
      await removeFromCart(productId);
      setCart((prevItems) => prevItems.filter((item) => item._id !== productId));
      setRemovingItem(null);
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  }, 300);
};

  const getSubtotal = (item) => item.price * item.quantity;
  const cartTotal = cart.reduce((acc, item) => acc + getSubtotal(item), 0);

  const handleCheckout = () => {
    // Guarda el carrito en localStorage para que Checkout lo recoja
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">El carrito está vacío</p>
      ) : (
        <>
          <ul>
           {cart.map((item, index) => (
  <li
    key={item._id}
    className={`cart-item ${removingItem === item._id ? "removing" : ""}`}
  >
    <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
    <div className="cart-item-details">
      <p className="cart-item-name">{item.name}</p>
      <p className="cart-item-price">Precio: {item.price}€</p>
      <div className="cart-item-quantity">
        <label>
          Cantidad:{" "}
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              handleQuantityChange(item._id, Number(e.target.value))
            }
            style={{ width: "50px" }}
          />
        </label>
      </div>
      <p className="cart-item-subtotal">
        Subtotal: {(item.price * item.quantity).toFixed(2)}€
      </p>
      <button
        className="remove-item-button"
        onClick={() => handleRemoveItem(item._id)}
      >
        Eliminar
      </button>
    </div>
  </li>
))}
          </ul>
          <div className="cart-summary">
            <p className="cart-total">
              Total del carrito: <strong>{cartTotal.toFixed(2)}€</strong>
            </p>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceder al pago
            </button>
          </div>
          {/* Recomendaciones personalizadas debajo del resumen */}
          <Recommendations />
        </>
      )}
    </div>
  );
};

export default CartPage;