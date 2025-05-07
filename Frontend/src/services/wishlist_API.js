import axios from "axios";

const API_URL = "http://localhost:5000/api/wishlist";

export const fetchWishlist = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la wishlist:", error);
    throw error;
  }
};