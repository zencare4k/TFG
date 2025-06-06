import axios from "axios";

export const fetchUserRecommendations = async (token) => {
  console.log("Token enviado:", token);
  try {
    const response = await axios.get("https://tfg-5q0w.onrender.com/api/recommendations", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener recomendaciones:", error);
    return [];
  }
};