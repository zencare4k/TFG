import axios from "axios";

const API_URL = "https://tfg-5q0w.onrender.com/api/cart"; // Cambia la URL según tu backend
const RECOMMENDATIONS_URL = "https://tfg-5q0w.onrender.com/api/recommendations"; // Endpoint para recomendaciones

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
export const fetchCartItems = async (userId) => {
  if (!userId) throw new Error("userId es requerido");
  const response = await axios.get(`${API_URL}?userId=${userId}`);
  return response.data;
};
export const clearCart = async (token) => {
  try {
    const response = await fetch("https://tfg-5q0w.onrender.com/api/cart/clear", {
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
export const removeFromCart = async (userId, productId) => {
  if (!userId) throw new Error("userId es requerido");
  const response = await fetch(`${API_URL}/${userId}/${productId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("No se pudo eliminar el producto");
  return response.json();
};