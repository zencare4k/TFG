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
// Función para obtener productos
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al obtener los productos');
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al eliminar el producto");
  }
};

// Función para actualizar un producto
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al actualizar el producto");
  }
};