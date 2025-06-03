import axios from "axios";
const API_BASE_URL = 'http://localhost:5000/api';

export const fetchCartItems = async (userId, token) => {
    if (!userId) throw new Error("userId es requerido");
    const response = await axios.get(`${API_BASE_URL}/cart?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};