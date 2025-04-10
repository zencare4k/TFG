import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/notfound.css'; // Opcional: agrega estilos personalizados

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/" className="back-home-link">Volver al inicio</Link>
    </div>
  );
};

export default NotFound;