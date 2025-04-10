import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth_API';
import '../../styles/login.css';
import NotificationSystem from '../Shared/NotificationSystem';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] =useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Usar el contexto de autenticación

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password); // Llamar a la función de login del contexto
      setSuccess(`Bienvenido, ${username}`);
      setTimeout(() => {
        navigate('/'); // Redirigir al inicio
      }, 2000);
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h2>Iniciar Sesión</h2>
      <div>
        <label>Nombre de Usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      {error && <NotificationSystem message={error} type="error" />}
      {success && <NotificationSystem message={success} type="success" />}
      <button type="submit">Iniciar Sesión</button>
      <div className="secondary-actions">
        <button type="button" onClick={() => navigate('/register')}>
          Registrarse
        </button>
        <button type="button" onClick={() => navigate('/forgot-password')}>
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </form>
  );
};

export default LoginForm;