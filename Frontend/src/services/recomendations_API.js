import axios from "axios";

const RECOMMENDATIONS_URL = "http://localhost:5000/api/recommendations";

export const fetchUserRecommendations = async (userId) => {
  if (!userId) {
    console.warn("fetchUserRecommendations: userId no definido");
    return [];
  }
  try {
    const response = await axios.get(`${RECOMMENDATIONS_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener recomendaciones:", error);
    return [];
  }
};