import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/EmailApi";
import "../../styles/ResetPassword.css";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    try {
      await resetPassword(token, password);
      setSuccess("Contraseña actualizada correctamente");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Token inválido o expirado");
    }
  };

  return (
    <div className="reset-password-page">
      <h2>Cambiar contraseña</h2>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <label>Nueva contraseña:</label>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Cambiar contraseña</button>
        {success && <div className="success-msg">{success}</div>}
        {error && <div className="error-msg">{error}</div>}
      </form>
    </div>
  );
};

export default ResetPasswordForm;