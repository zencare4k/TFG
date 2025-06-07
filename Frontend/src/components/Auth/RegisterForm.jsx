import React, { useState } from 'react';
import { registerUser } from '../../services/auth_API';
import '../../styles/login.css';
import NotificationSystem from '../Shared/NotificationSystem';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('El formato del correo electrónico no es válido');
      return;
    }
    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un símbolo');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setError('');
    try {
      const message = await registerUser({ username, email, password });
      console.log('Usuario registrado exitosamente:', email);
      setSuccess(message);
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      setError(err.message || 'Error al registrar el usuario');
    }
  };

  return (
    <form onSubmit={handleRegister} className="auth-form">
      <h2>Registrarse</h2>
      <div>
        <label>Nombre de Usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Correo Electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirmar contraseña:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <NotificationSystem message={error} type="error" />}
      {success && <NotificationSystem message={success} type="success" />}
      <button type="submit">Registrarse</button>
      <button type="button" onClick={() => window.location.href = '/login'}>
        ¿Tienes una cuenta? Inicia sesión
      </button>
    </form>
  );
};

export default RegisterForm;