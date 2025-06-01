import React, { useState, useEffect } from "react";
import "../../styles/CartPage.css";
import { fetchCartItems, fetchRecommendations, removeFromCart } from "../../services/cart_API";

const CartPage = () => {
  const [cart, setCart] = useState([]); // Productos en el carrito
  const [recommendations, setRecommendations] = useState([]); // Recomendaciones basadas en el carrito
  const [removingItem, setRemovingItem] = useState(null); // Estado para manejar la animación de eliminación

  // Nueva función para cambiar la cantidad
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const cartItems = await fetchCartItems(); // Obtener productos del carrito
        setCart(cartItems);

        if (cartItems.length > 0) {
          const category = cartItems[0].category; // Obtener recomendaciones basadas en la categoría
          const recommendedProducts = await fetchRecommendations(category);
          setRecommendations(recommendedProducts);
        }
      } catch (error) {
        console.error("Error al cargar los datos del carrito:", error);
      }
    };

    loadCartData();
  }, []);

  const handleRemoveItem = async (productId) => {
    setRemovingItem(productId); // Activar la animación de eliminación
    setTimeout(async () => {
      try {
        await removeFromCart(productId); // Llamar al servicio para eliminar el producto
        setCart((prevItems) => prevItems.filter((item) => item.id !== productId)); // Actualizar el estado
        setRemovingItem(null); // Resetear el estado de eliminación
      } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
      }
    }, 300); // Tiempo de la animación
  };

  // Calcular subtotal por producto y total del carrito
  const getSubtotal = (item) => item.price * item.quantity;
  const cartTotal = cart.reduce((acc, item) => acc + getSubtotal(item), 0);

  const handleCheckout = () => {
    // Aquí puedes redirigir a la página de checkout o siguiente paso
    alert("Proceder al pago (implementa la navegación aquí)");
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
                key={index}
                className={`cart-item ${removingItem === item.id ? "removing" : ""}`}
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
                          handleQuantityChange(item.id, Number(e.target.value))
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
                    onClick={() => handleRemoveItem(item.id)}
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
        </>
      )}
    </div>
  );
};

export default CartPage;