import axios from "axios";

const API_URL = "http://localhost:5000/api/cart"; // Cambia la URL según tu backend
const RECOMMENDATIONS_URL = "http://localhost:5000/api/recommendations"; // Endpoint para recomendaciones

// Servicio para añadir un producto al carrito
export const addToCart = async (product) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error) {
    console.error("Error al añadir el producto al carrito:", error);
    throw error;
  }
};

// Servicio para obtener los productos del carrito
export const fetchCartItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos del carrito:", error);
    throw error;
  }
};
export const clearCart = async (token) => {
  try {
    const response = await fetch("http://localhost:5000/api/cart/clear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    throw error;
  }
};
// Servicio para obtener recomendaciones basadas en la categoría
export const fetchRecommendations = async (category) => {
  if (!category) {
    console.warn("fetchRecommendations: categoría no definida");
    return [];
  }
  try {
    const response = await axios.get(`${RECOMMENDATIONS_URL}?category=${category}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las recomendaciones:", error);
    throw error;
  }
};
export const removeFromCart = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el producto del carrito:", error);
    throw error;
  }
};