import React, { useState } from 'react';
import Modal from '../Shared/Modal';
import ProductConfigurator from '../Home/ProductConfigurator';
import '../../styles/ConfigurationPage.css'; // Importar los estilos

const OpenConfiguratorButton = ({ product, addToCart }) => {
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

  const handleOpenConfigurator = () => {
    setIsConfiguratorOpen(true);
  };

  const handleCloseConfigurator = () => {
    setIsConfiguratorOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenConfigurator} className="open-configurator-button">
        Configurar Producto
      </button>
      <Modal isOpen={isConfiguratorOpen} onClose={handleCloseConfigurator}>
        <ProductConfigurator product={product} addToCart={addToCart} onClose={handleCloseConfigurator} />
      </Modal>
    </div>
  );
};

export default OpenConfiguratorButton;