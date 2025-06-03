// ...existing imports...
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { processCheckout } from "../../services/checkoutService";
import { clearCart } from "../../services/cart_API";
import "../../styles/Checkout.css";
import CheckoutConfirm from "./checkoutConfirm";
import { fetchCartItems } from "../../services/fetchCartItems";
import { AuthContext } from "../context/AuthContext";
const stripePromise = loadStripe("pk_test_51RVabIGdkgPayLqPnTaoQIvWb7LAGdBx5RxOlzhfDMVpe5ntv4Yp3Op2iyQI2BCsjiG0dCa4sq5k60s5VJg2LhLS00paOIvZx3");

const getTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const CheckoutForm = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    postal: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        if (!user?._id) return;
        const token = localStorage.getItem("token");
        const items = await fetchCartItems(user._id, token);
        setCartItems(items);
      } catch (e) {
        setCartItems([]);
      }
    };
    cargarCarrito();
  }, [user]);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  // Mapeo de items para asegurar que tienen productId, name, price, quantity, imageUrl
  const checkoutCartItems = cartItems.map(item => ({
    productId: item.productId || item._id, // usa productId o _id
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    imageUrl: item.imageUrl,
  }));

  // LOG de depuración: revisa en la consola del navegador estos datos
  console.log({
    address,
    checkoutCartItems,
    total: getTotal(cartItems),
    token: localStorage.getItem("token"),
  });

  try {
    // 1. Solicita el PaymentIntent al backend
    const response = await processCheckout({
      address,
      cartItems: checkoutCartItems,
      total: getTotal(cartItems),
      token: localStorage.getItem("token"),
    });
    const data = await response.json();
    if (!data.clientSecret) throw new Error("No se pudo crear el pago");

    setClientSecret(data.clientSecret);

    // ...resto del código...

      // 2. Confirma el pago con Stripe
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: address.name },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setSuccess(true);
        localStorage.removeItem("cart");
        try {
          await clearCart(localStorage.getItem("token")); // <-- Vacía el carrito en el backend
        } catch (e) {
          // Opcional: puedes mostrar un mensaje si falla el vaciado en backend
          console.error("No se pudo vaciar el carrito en el backend", e);
        }
      }
    } catch (err) {
      setError("Error de conexión o de pago.");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    navigate("/cart");
  };

  if (success) {
    return <CheckoutConfirm />
  }

  return (
    <div className="checkout-page">
      <h2>Resumen del pedido</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.productId || item._id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img
              src={item.imageUrl}
              alt={item.name}
              className="checkout-preview-img"
            />
            <span>
              {item.name} x{item.quantity} - €{(item.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <h3>Total: €{getTotal(cartItems).toFixed(2)}</h3>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h3>Dirección de envío</h3>
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={address.name}
          onChange={handleAddressChange}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Calle y número"
          value={address.street}
          onChange={handleAddressChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          value={address.city}
          onChange={handleAddressChange}
          required
        />
        <input
          type="text"
          name="postal"
          placeholder="Código postal"
          value={address.postal}
          onChange={handleAddressChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="País"
          value={address.country}
          onChange={handleAddressChange}
          required
        />

        <h3>Método de pago</h3>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
        <div className="checkout-buttons">
          <button type="submit" disabled={loading || !stripe || !elements}>
            {loading ? "Procesando..." : "Continuar con el pago"}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar y volver atrás
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;