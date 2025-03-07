import jwt from "jsonwebtoken";
import config from "../../config.js";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Acceso denegado" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Acceso denegado: solo administradores" });
  }
  next();
};

export { authMiddleware, adminMiddleware };