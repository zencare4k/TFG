import axios from 'axios';

const API_BASE_URL = 'https://tfg-5q0w.onrender.com/api';

// Servicio para obtener los datos del carrito de un usuario autenticado
export const fetchCartItems = async (userId, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/cart?userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos del carrito:", error);
        throw error;
    }
};