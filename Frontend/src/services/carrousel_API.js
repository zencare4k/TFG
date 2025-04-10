import axios from "axios";

const API_URL = "http://localhost:5000/api/carousel"; // Cambia la URL según tu backend

// Obtiene las imágenes del carrusel desde la base de datos
export const fetchCarouselImages = async () => {
    try {
        const response = await axios.get(`${API_URL}/images`);
        return response.data; // Asegúrate de que el backend devuelva las imágenes en el formato esperado
    } catch (error) {
        console.error("Error al obtener las imágenes del carrusel:", error);
        throw error;
    }
};