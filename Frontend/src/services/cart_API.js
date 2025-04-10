import axios from "axios";

const API_URL = "http://localhost:5000/api/cart"; // Cambia la URL según tu backend

// Obtiene los productos del carrito desde la base de datos
export const fetchCartItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/items`);
        return response.data; // Asegúrate de que el backend devuelva los datos en el formato esperado
    } catch (error) {
        console.error("Error al obtener los productos del carrito:", error);
        throw error;
    }
};

// Obtiene recomendaciones basadas en la categoría
export const fetchRecommendations = async (category) => {
    try {
        const response = await axios.get(`${API_URL}/recommendations`, { params: { category } });
        return response.data;
    } catch (error) {
        console.error("Error al obtener recomendaciones:", error);
        throw error;
    }
};