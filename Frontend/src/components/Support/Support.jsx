import React, { useState } from "react";
import { sendSupportEmail } from "../../services/EmailApi";
import "../../styles/SupportPage.css"; // Importa el CSS aquí

const SupportPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSent(false);

  if (!form.name || !form.email || !form.message) {
    setError("Todos los campos son obligatorios.");
    return;
  }

  setLoading(true);
  try {
    await sendSupportEmail({
      from_name: form.name,
      reply_to: form.email,
      message: form.message
    });
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  } catch (err) {
    setError("Error al enviar el mensaje. Inténtalo de nuevo.");
  }
  setLoading(false);
};
  return (
    <div className="support">
      <h2>Soporte</h2>
      <form className="support-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mensaje:
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
      {sent && <p className="success-msg">¡Mensaje enviado correctamente!</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default SupportPage;