import React, { createContext, useState, useEffect } from "react";
import { loginUser } from "../../services/auth_API";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recuperar el usuario de localStorage al cargar la aplicación
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const { user, token } = await loginUser(username, password);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user)); // Guardar el usuario en localStorage
      localStorage.setItem("token", token); // Guardar el token en localStorage
    } catch (error) {
      throw new Error(error.response?.data?.error || "Error al iniciar sesión");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Eliminar el usuario de localStorage
    localStorage.removeItem("token"); // Eliminar el token de localStorage
    window.location.href = "/"; // Redirigir al inicio
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};