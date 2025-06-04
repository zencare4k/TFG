import axios from "axios";

export const fetchUserRecommendations = async (token) => {
  try {
    const response = await axios.get("http://localhost:5000/api/recommendations", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener recomendaciones:", error);
    return [];
  }
};