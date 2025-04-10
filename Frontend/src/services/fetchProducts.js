import axios from "axios";

const API_URL = "http://localhost:5000/api/products"; // Cambia la URL según tu backend

export const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Asegúrate de que el backend devuelva los productos en el formato esperado
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};