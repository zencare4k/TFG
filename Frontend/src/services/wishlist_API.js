import axios from "axios";

const API_URL = "https://tfg-5q0w.onrender.com/api/wishlist";

export const addToWishlist = async (userId, product) => {
  if (!userId || !product || !product._id) {
    console.error("addToWishlist: userId o product inválido", { userId, product });
    return;
  }
  try {
    await axios.post(API_URL, { userId, product });
  } catch (error) {
    if (error.response?.status === 409 || error.response?.data?.error?.includes("ya en la wishlist")) {
      throw new Error("Este producto ya está en tu wishlist.");
    }
    console.error("Error al añadir a la wishlist:", error);
    throw error;
  }
};

export const fetchWishlist = async (userId) => {
  if (!userId) {
    console.error("fetchWishlist: userId inválido", { userId });
    return [];
  }
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la wishlist:", error);
    throw error;
  }
};

export const removeFromWishlist = async (userId, productId) => {
  if (!userId || !productId) {
    console.error("removeFromWishlist: userId o productId inválido", { userId, productId });
    return;
  }
  try {
    await axios.delete(`${API_URL}/${userId}/${productId}`);
  } catch (error) {
    console.error("Error al eliminar de la wishlist:", error);
    throw error;
  }
};