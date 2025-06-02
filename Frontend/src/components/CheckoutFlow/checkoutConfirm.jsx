import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Checkout.css";

const CheckoutConfirm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Elimina el carrito del localStorage al mostrar la confirmación
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="checkout-page">
      <div className="checkout-success">
        <h2>¡Gracias por su compra!</h2>
        <p>
          Su pedido ha sido procesado correctamente.<br />
          En breve recibirá un correo con los detalles de su compra.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
          alt="Compra exitosa"
          style={{ width: 100, margin: "30px auto 20px auto", display: "block" }}
        />
        <button
          className="checkout-button"
          onClick={() => navigate("/")}
          style={{ marginTop: 20 }}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default CheckoutConfirm;