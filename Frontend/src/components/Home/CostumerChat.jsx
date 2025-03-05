import React, { useState } from 'react';
import '../../styles/CostumerChat.css';

const CostumerChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (message, response) => {
    setMessages([...messages, { from: 'user', text: message }]);
    setIsThinking(true);

    setTimeout(() => {
      setMessages([...messages, { from: 'user', text: message }, { from: 'bot', text: response }]);
      setIsThinking(false);
    }, 2000);
  };

  return (
    <div className="costumer-chat">
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header" onClick={toggleChat}>
          <img src={`${process.env.PUBLIC_URL}/assets/icons/chat-icon.png`} alt="Chat Icon" className="chat-icon" />
          <span>Soporte</span>
        </div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.from}`}>
              {msg.text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          ))}
          {isThinking && (
            <div className="chat-message bot thinking">
              <span>...</span>
            </div>
          )}
        </div>
        <div className="chat-footer">
          <button onClick={() => handleButtonClick('📦 Asistencia con pedidos', '¿No sabes qué talla elegir o buscas una camiseta para una ocasión especial?\nCuéntanos tus preferencias y te ayudaremos a encontrar la mejor opción para ti.')}>📦 Asistencia con pedidos</button>
          <button onClick={() => handleButtonClick('👕 Recomendaciones y asesoramiento', '¿No sabes qué talla elegir o buscas una camiseta para una ocasión especial?\nCuéntanos tus preferencias y te ayudaremos a encontrar la mejor opción para ti.')}>👕 Recomendaciones y asesoramiento</button>
          <button onClick={() => handleButtonClick('🔄 Cambios y devoluciones', 'Si tu camiseta no es exactamente lo que esperabas, podemos guiarte en el proceso de cambio o devolución.\nDinos tu número de pedido y te explicaremos los pasos a seguir.')}>🔄 Cambios y devoluciones</button>
          <button onClick={() => handleButtonClick('🎉 Promociones y descuentos', '¿Te gustaría conocer nuestras ofertas actuales o recibir un descuento especial?\nTe informaremos sobre nuestras promociones vigentes y cómo aprovecharlas.')}>🎉 Promociones y descuentos</button>
        </div>
      </div>
      <div className="chat-toggle" onClick={toggleChat}>
        <img src={`${process.env.PUBLIC_URL}/assets/icons/chat-icon.png`} alt="Chat Icon" />
      </div>
    </div>
  );
};

export default CostumerChat;