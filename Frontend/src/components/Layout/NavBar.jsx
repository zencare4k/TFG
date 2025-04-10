import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/layout.css";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Obtener el usuario autenticado y la función de logout
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú desplegable
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/assets/icons/Logo.svg" alt="Logo de la aplicación" className="logo-image" />
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li><Link to="/" className="nav-item">Inicio</Link></li>
          <li><Link to="/404" className="nav-item">Camisetas Hombre</Link></li>
          <li><Link to="/404" className="nav-item">Camisetas Mujer</Link></li>
          <li><Link to="/404" className="nav-item">Camisetas Niño</Link></li>
          <li><Link to="/404" className="nav-item">Camisetas Niña</Link></li>
          <li><Link to="/support" className="nav-item">Contacto</Link></li>
          {/* Mostrar las secciones de administración si el usuario es administrador */}
          {user?.isAdmin && (
            <>
              <li>
                <Link to="/add-product" className="nav-item admin-item">
                  Añadir Productos
                </Link>
              </li>
              <li>
                <Link to="/manage-products" className="nav-item admin-item">
                  Gestionar Productos
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="user-container">
        {/* Ícono del carrito siempre visible */}
        <div className="cart-icon-container" onClick={() => navigate("/cart")}>
          <img src="/assets/icons/Carrito.svg" alt="Carrito" className="cart-icon" />
        </div>
        {user ? (
          <div className="user-info">
            <div className="user-profile login-button" onClick={toggleMenu}>
              <img
                src={user.profileImage || "/assets/icons/iniciado.png"}
                alt="Usuario"
                className="user-image"
              />
              <span className="user-name">{user.username}</span>
            </div>
            {menuOpen && (
              <div className="dropdown-menu">
                <button onClick={logout}>Cerrar Sesión</button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="login-button"
            onClick={() => navigate("/login")}
          >
            <img src="/assets/icons/IniciarSesion.svg" alt="Login" className="login-icon" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;