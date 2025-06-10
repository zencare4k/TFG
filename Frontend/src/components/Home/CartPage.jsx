import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CartPage.css";
import { fetchCartItems, removeFromCart /*, updateCartItemSize*/ } from "../../services/cart_API";
import Recommendations from "../Shared/Recommendations";
import { AuthContext } from "../context/AuthContext";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [removingItem, setRemovingItem] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Cambiar talla en el carrito (solo frontend, puedes conectar con backend si quieres)
  const handleSizeChange = (productId, newSize) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, size: newSize } : item
      )
    );
    // Si quieres guardar en backend, descomenta y crea el endpoint:
    // updateCartItemSize(user._id, productId, newSize);
  };

  useEffect(() => {
    const loadCartData = async () => {
      try {
        if (!user || !user._id) return;
        const cartItems = await fetchCartItems(user._id);
        setCart(cartItems);
      } catch (error) {
        console.error("Error al cargar los datos del carrito:", error);
      }
    };

    loadCartData();
  }, [user]);

  const handleRemoveItem = async (productId) => {
    setRemovingItem(productId);
    setTimeout(async () => {
      try {
        await removeFromCart(String(user._id), String(productId));
        setCart((prevItems) => prevItems.filter((item) => item.productId !== productId));
        setRemovingItem(null);
      } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
      }
    }, 300);
  };

  const getSubtotal = (item) => item.price * item.quantity;
  const cartTotal = cart.reduce((acc, item) => acc + getSubtotal(item), 0);

  const handleCheckout = () => {
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
            {cart.map((item) => (
              <li
                key={item._id}
                className={`cart-item ${removingItem === item._id ? "removing" : ""}`}
              >
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">Precio: {item.price}€</p>
                  {/* Selector de talla */}
                  <div className="cart-item-size">
                    <label htmlFor={`size-select-${item._id}`}>Talla: </label>
                    <select
                      id={`size-select-${item._id}`}
                      value={item.size || "M"}
                      onChange={e => handleSizeChange(item._id, e.target.value)}
                      style={{ marginLeft: 8, marginBottom: 8 }}
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
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
                    onClick={() => handleRemoveItem(item.productId)}
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
          <Recommendations />
        </>
      )}
    </div>
  );
};

export default CartPage;