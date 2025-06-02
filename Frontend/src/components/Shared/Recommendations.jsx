import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CartPage.css";
import { fetchUserRecommendations } from "../../services/recomendations_API";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadRecommendations = async () => {
      if (!userId) return;
     try {
  const recommendedProducts = await fetchUserRecommendations(userId);
  console.log("Recomendaciones recibidas:", recommendedProducts); // <-- Añade esto
  setRecommendations(recommendedProducts.slice(0, 2));
} catch (error) {
  console.error("Error al cargar recomendaciones:", error);
}
    };

    loadRecommendations();
  }, [userId]);

  if (recommendations.length === 0) return null;

  return (
    <section className="recommendations-section">
      <h3 className="recommendations-title">Tal vez te gustará</h3>
      <p className="recommendations-desc">
        Basándonos en tus gustos y productos añadidos al carrito, creemos que estos productos también podrían interesarte:
      </p>
      <div className="recommendations-list">
        {recommendations.map((product) => (
          <div className="recommendation-card" key={product._id || product.id}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="recommendation-img"
              onClick={() => navigate(`/product/${product._id || product.id}`)}
              style={{ cursor: "pointer" }}
            />
            <div className="recommendation-info">
              <span className="recommendation-name">{product.name}</span>
              <span className="recommendation-price">{product.price}€</span>
              <button
                className="recommendation-details-btn"
                onClick={() => navigate(`/product/${product._id || product.id}`)}
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommendations;