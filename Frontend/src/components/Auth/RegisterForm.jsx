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

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, include an uppercase letter, a number, and a symbol');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    registerUser({ username, email, password })
      .then(message => {
        console.log('Correo registrado exitosamente:', email); // Mensaje en consola

        setSuccess(message);
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      })
      .catch(err => setError(err));
  };

  return (
    <form onSubmit={handleRegister} className="auth-form">
      <h2>Register</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <NotificationSystem message={error} type="error" />}
      {success && <NotificationSystem message={success} type="success" />}
      <button type="submit">Register</button>
      <button type="button" onClick={() => window.location.href = '/login'}>
        Already have an account? Login
      </button>
    </form>
  );
};

export default RegisterForm;