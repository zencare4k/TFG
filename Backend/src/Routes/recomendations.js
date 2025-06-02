import express from "express";
import { getRecommendations } from "../Controllers/recomendations.js";

const router = express.Router();

// Ruta para obtener recomendaciones por usuario
router.get("/:userId", getRecommendations);

export default router;