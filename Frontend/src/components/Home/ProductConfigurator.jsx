import React, { useState } from 'react';
import '../../styles/ConfigurationPage.css'; // Importar los estilos

// Simulador de decisiones
const ProductConfigurator = ({ product, addToCart, onClose }) => {
  const [productConfig, setProductConfig] = useState({
    color: 'Rojo',
    tamaño: 'M',
    cantidad: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const configuredProduct = {
      ...product,
      ...productConfig,
    };
    addToCart(configuredProduct);
    onClose(); // Cerrar el modal después de añadir al carrito
  };

  return (
    <form onSubmit={handleSubmit} className="configuration-page">
      <h2>Configura tu producto</h2>
      <div>
        <label>
          Color:
          <select name="color" value={productConfig.color} onChange={handleChange}>
            <option value="Rojo">Rojo</option>
            <option value="Verde">Verde</option>
            <option value="Azul">Azul</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Tamaño:
          <select name="tamaño" value={productConfig.tamaño} onChange={handleChange}>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Cantidad:
          <input
            type="number"
            name="cantidad"
            value={productConfig.cantidad}
            onChange={handleChange}
            min="1"
          />
        </label>
      </div>
      <button type="submit">Añadir al carrito</button>
    </form>
  );
};

export default ProductConfigurator;