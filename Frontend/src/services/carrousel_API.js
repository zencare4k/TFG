import axios from "axios";

const API_URL = "http://localhost:5000/api/carousel"; 

 export const fetchCarouselImages = async () => {
    try {
        const response = await axios.get(`${API_URL}/images`);
        return response.data;  
    } catch (error) {
        console.error("Error al obtener las imágenes del carrusel:", error);
        throw error;
    }
};