import express from "express";
import { getRecommendations } from "../Controllers/recomendations.js";
import { authMiddleware } from "../Middleware/auth.js";

const router = express.Router();

// Ruta protegida, el userId se extrae del token
router.get("/", authMiddleware, getRecommendations);
export default router;