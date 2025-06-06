import axios from "axios";

const api = axios.create({
  baseURL: "https://tfg-5q0w.onrender.com/api", // Cambia esto según la URL de tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar el token JWT a las solicitudes automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;