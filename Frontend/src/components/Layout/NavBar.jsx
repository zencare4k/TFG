import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/layout.css";
import { AuthContext } from "../context/AuthContext";
import CartPreview from "../Home/CartPreview";
import { addToCart, fetchCartItems } from "../../services/cart_API";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const toggleCartPreview = async () => {
    setShowCartPreview((prev) => !prev);
    if (!showCartPreview) {
      try {
        let items = [];
        if (user && user._id) {
          items = await fetchCartItems(user._id);
        } else {
          items = JSON.parse(localStorage.getItem("cart")) || [];
        }
        setCartItems(items);
      } catch (error) {
        console.error("Error al cargar los productos del carrito:", error);
      }
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
      const updatedCart = await fetchCartItems();
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error al añadir el producto al carrito:", error);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <img src="/assets/icons/Logo.svg" alt="Logo de la aplicación" className="logo-image" />
        </Link>
      </div>
      <button
        className={`hamburger${menuOpen ? " open" : ""}`}
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </button>
      <nav className={`nav${menuOpen ? " open" : ""}`}>
        <ul className="nav-list">
          <li><Link to="/" className="nav-item" onClick={closeMenu}>Inicio</Link></li>
          <li><Link to="/productos/hombre" className="nav-item" onClick={closeMenu}>Camisetas Hombre</Link></li>
          <li><Link to="/productos/mujer" className="nav-item" onClick={closeMenu}>Camisetas Mujer</Link></li>
          <li><Link to="/productos/nino" className="nav-item" onClick={closeMenu}>Camisetas Niño</Link></li>
          <li><Link to="/productos/nina" className="nav-item" onClick={closeMenu}>Camisetas Niña</Link></li>
          <li><Link to="/soporte" className="nav-item" onClick={closeMenu}>Contacto</Link></li>
          {user?.role === "productAdmin" && (
            <>
              <li>
                <Link to="/add-product" className="nav-item admin-item" onClick={closeMenu}>
                  Añadir Productos
                </Link>
              </li>
              <li>
                <Link to="/manage-products" className="nav-item admin-item" onClick={closeMenu}>
                  Gestionar Productos
                </Link>
              </li>
            </>
          )}
          {user?.role === "systemAdmin" && (
            <li>
              <Link to="/admin/systemadmin" className="nav-item admin-item" onClick={closeMenu}>
                Gestión de Usuarios
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="user-container">
        {/* Ícono del carrito */}
        <div className="cart-icon-container" onClick={toggleCartPreview}>
          <img src="/assets/icons/Carrito.svg" alt="Carrito" className="cart-icon" />
        </div>
        {showCartPreview && (
          <CartPreview
            cartItems={cartItems}
            setShowCartPreview={setShowCartPreview}
            showCartPreview={showCartPreview}
          />
        )}
        {/* Información del usuario */}
        {user ? (
          <div className="user-info">
            <div className="user-profile login-button" onClick={toggleMenu}>
              <img
                src={user.profileImage || "/assets/icons/iniciado.png"}
                alt="Usuario"
                className="user-image"
                onError={e => { e.target.onerror = null; e.target.src = "/assets/icons/iniciado.png"; }}
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
          <div className="user-info">
            <div
              className="user-profile login-button"
              onClick={() => { closeMenu(); navigate("/login"); }}
              style={{ cursor: "pointer" }}
            >
              <img src="/assets/icons/iniciado.png" alt="Login" className="user-image" />
              <span className="user-name">Iniciar sesión</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;