import axios from 'axios';

const API_URL = 'https://tfg-5q0w.onrender.com/api/auth';

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data.message; // Devuelve el mensaje de éxito
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al registrar el usuario");
  }
};
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // Devuelve el objeto { user, token }
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al iniciar sesión");
  }
};
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    // Devuelve solo el mensaje, no el objeto entero
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al enviar el enlace de recuperación');
  }
};