import jwt from "jsonwebtoken";
import config from "../../config.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ error: "Acceso denegado: no se proporcionó un token" });

  const token = authHeader.replace("Bearer ", ""); // Elimina "Bearer " del encabezado
  try {
    const decoded = jwt.verify(token, config.jwtSecret); // Verifica el token
    req.user = decoded; // Decodifica el token y lo asigna al usuario
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: "Acceso denegado: solo administradores" });
  }
  next();
};
export const roleMiddleware = (requiredRole) => (req, res, next) => {
  if (req.user?.role !== requiredRole) {
    return res.status(403).json({ message: "Acceso denegado: permisos insuficientes" });
  }
  next();
};
export { authMiddleware };