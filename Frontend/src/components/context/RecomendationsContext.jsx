import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchRecommendations } from "../services/recomendations_API";

const RecommendationsContext = createContext();

export const RecommendationsProvider = ({ children, userId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await fetchRecommendations(userId);
        setRecommendations(data);
      } catch (error) {
        console.error("Error al cargar las recomendaciones:", error);
      }
    };

    loadRecommendations();
  }, [userId]);

  return (
    <RecommendationsContext.Provider value={{ recommendations }}>
      {children}
    </RecommendationsContext.Provider>
  );
};

export const useRecommendations = () => useContext(RecommendationsContext);