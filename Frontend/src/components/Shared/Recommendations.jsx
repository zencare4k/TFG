import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CartPage.css";
import { fetchUserRecommendations } from "../../services/recomendations_API";
import "../../styles/Recomendation.css";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const [token] = useState(() => localStorage.getItem("token"));

useEffect(() => {
  const loadRecommendations = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const recommendedProducts = await fetchUserRecommendations(token);
      setRecommendations(recommendedProducts);
    } catch (error) {
      console.error("[RECS FRONT] Error al cargar recomendaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  loadRecommendations();
}, [token]);

  useEffect(() => {
    console.log("[RECS FRONT] Estado recommendations:", recommendations);
    console.log("[RECS FRONT] Estado loading:", loading);
  }, [recommendations, loading]);

  return (
    <section className="recommendations-section">
      <h3 className="recommendations-title">Tal vez te gustará</h3>
      <p className="recommendations-desc">
        Basándonos en tus gustos y productos añadidos al carrito, creemos que estos productos también podrían interesarte:
      </p>
      <div className="recommendations-list">
        {loading ? (
          <p className="no-recommendations">Cargando recomendaciones...</p>
        ) : recommendations && recommendations.length === 0 ? (
          <p className="no-recommendations">No hay recomendaciones disponibles en este momento.</p>
        ) : (
          recommendations.map((product, idx) => {
            console.log("[RECS FRONT] Renderizando producto:", product);
            return (
              <div className="recommendation-card" key={product._id || product.id || idx}>
                <img
                  src={product.imageUrl || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="recommendation-img"
                  onClick={() => navigate(`/product/${product._id || product.id}`)}
                  style={{ cursor: "pointer" }}
                />
                <div className="recommendation-info">
                  <span className="recommendation-name">{product.name}</span>
                  <span className="recommendation-price">
                    {product.price !== undefined && product.price !== null
                      ? `${product.price}€`
                      : "Sin precio"}
                  </span>
                  <button
                    className="recommendation-details-btn"
                    onClick={() => navigate(`/product/${product._id || product.id}`)}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Recommendations;