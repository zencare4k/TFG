import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/layout.css";
import { AuthContext } from "../context/AuthContext";
import CartPreview from "../Home/CartPreview";
import { addToCart, fetchCartItems } from "../../services/cart_API"; // Importar servicios del carrito

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCartPreview = async () => {
    setShowCartPreview((prev) => !prev);

    // Cargar los productos del carrito desde la base de datos
    if (!showCartPreview) {
      try {
        const items = await fetchCartItems();
        setCartItems(items);
      } catch (error) {
        console.error("Error al cargar los productos del carrito:", error);
      }
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product); // Añadir el producto al carrito en la base de datos
      const updatedCart = await fetchCartItems(); // Obtener el carrito actualizado
      setCartItems(updatedCart); // Actualizar el estado del carrito
    } catch (error) {
      console.error("Error al añadir el producto al carrito:", error);
    }
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
          {user?.role === "productAdmin" && (
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
          {user?.role === "systemAdmin" && (
            <li>
              <Link to="/admin/systemadmin" className="nav-item admin-item">
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

        {/* Mostrar CartPreview si está activo */}
        {showCartPreview && (
          <CartPreview
            cartItems={cartItems} // Pasar los productos del carrito
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