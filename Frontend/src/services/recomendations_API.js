import axios from "axios";

const API_URL = "http://localhost:5000/api/recommendations";

export const fetchRecommendations = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las recomendaciones:", error);
    throw error;
  }
};