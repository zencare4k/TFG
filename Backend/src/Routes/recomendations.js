import express from "express";
import { getRecommendations } from "../Controllers/recomendations.js";
import { authMiddleware } from "../Middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Recommendations
 *     description: Recomendaciones de productos
 */

/**
 * @swagger
 * /api/recommendations:
 *   get:
 *     summary: Obtener recomendaciones personalizadas para el usuario autenticado
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos recomendados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   imageUrl:
 *                     type: string
 *       401:
 *         description: No autorizado
 */

router.get("/", authMiddleware, getRecommendations);
export default router;