import axios from "axios";

const API_URL = "http://localhost:5000/api/products"; // Cambia la URL según tu backend

// Función para crear un producto
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al crear el producto");
  }
};

export const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Asegúrate de que el backend devuelva los productos en el formato esperado
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};
// filepath: Frontend/src/services/product_API.js
export const fetchProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
export const deleteProduct = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al eliminar el producto");
  }
};

export const fetchProductReviews = async (id) => {
  const res = await axios.get(`${API_URL}/${id}/reviews`);
  return res.data;
};

export const submitReview = async (id, review) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `${API_URL}/${id}/reviews`,
    review,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Función para actualizar un producto
export const updateProduct = async (id, productData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al actualizar el producto");
  }
};