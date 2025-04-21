import React, { createContext, useState, useEffect } from "react";
import { loginUser } from "../../services/auth_API";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      // Verificar si los valores existen antes de analizarlos
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error al cargar los datos del usuario desde localStorage:", error.message);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const { token, role } = await loginUser(username, password);
      const user = { username, role };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Método para verificar si el usuario tiene un rol específico
  const hasRole = (role) => user?.role === role;

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};