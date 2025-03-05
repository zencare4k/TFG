import React from 'react';
import '../../styles/layout.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="logo">
        <img 
          src="/assets/icons/Logo.svg" 
          alt="Logo de la aplicación" 
          className="logo-image"
        />
      </div>
      <nav className="nav-footer">
        <ul className="nav-list-footer">
          <li><a href="#home" className="nav-item-footer">Inicio</a></li>
          <li><a href="#about" className="nav-item-footer">Acerca de</a></li>
          <li><a href="#services" className="nav-item-footer">Servicios</a></li>
          <li><a href="#contact" className="nav-item-footer">Contacto</a></li>
        </ul>
      </nav>
      <div id='Derechos'>
        <p>© 2025 Telite. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;