import React, { useState } from 'react';
import { forgotPassword } from '../../services/auth_API';
import '../../styles/login.css';
import NotificationSystem from '../Shared/NotificationSystem';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    setError('');
    forgotPassword(email)
      .then(message => {
        console.log('Correo electrónico detectado correctamente:', email);

        setSuccess(message);
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      })
      .catch(err => setError(err.message || "Error al enviar el correo de recuperación"));
  };

  return (
    <form onSubmit={handleForgotPassword} className="auth-form">
      <h2>Forgot Password</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {error && <NotificationSystem message={error} type="error" />}
      {success && <NotificationSystem message={success} type="success" />}
      <button type="submit">Send Recovery Link</button>
    </form>
  );
};

export default ForgotPasswordForm;