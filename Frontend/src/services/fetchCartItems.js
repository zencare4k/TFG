import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Cambia esto por la URL de tu backend

// Servicio para obtener los datos del carrito
export const fetchCartItems = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cart`);
        return response.data; // Devuelve los datos del carrito
    } catch (error) {
        console.error("Error al obtener los datos del carrito:", error);
        throw error;
    }
};