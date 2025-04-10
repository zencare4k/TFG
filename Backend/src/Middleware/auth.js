import jwt from "jsonwebtoken";
import config from "../../config.js";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Acceso denegado" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), config.JWT_SECRET);
    req.user = decoded; // Decodifica el token y lo asigna al usuario
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};


export const adminMiddleware = (req, res, next) => {
  if (!req.user?.isAdmin) { // Verifica si el usuario tiene permisos de administrador
    return res.status(403).json({ error: "Acceso denegado: solo administradores" });
  }
  next();
};

export { authMiddleware };