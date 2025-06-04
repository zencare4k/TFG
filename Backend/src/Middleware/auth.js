import jwt from "jsonwebtoken";
import config from "../../config.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Acceso denegado: no se proporcionó un token" });
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};
export const adminMiddleware = (req, res, next) => {
  console.log("Rol del usuario:", req.user?.role);
  if (req.user?.role !== "productAdmin" && req.user?.role !== "systemAdmin") {
    return res.status(403).json({ error: "Acceso denegado: solo administradores" });
  }
  next();
};
// Middleware para verificar un rol específico
export const roleMiddleware = (requiredRole) => (req, res, next) => {
  if (req.user?.role !== requiredRole) {
    return res.status(403).json({ message: "Acceso denegado: permisos insuficientes" });
  }
  next();
};