import { Router } from "express";
import { getProductReviews, addProductReview } from "../Controllers/reviews.js";

const router = Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   - name: Reviews
 *     description: Reseñas de productos
 */

/**
 * @swagger
 * /api/products/{productId}/reviews:
 *   get:
 *     summary: Obtener todas las reseñas de un producto
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Lista de reseñas del producto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user:
 *                     type: string
 *                   rating:
 *                     type: integer
 *                   comment:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *   post:
 *     summary: Añadir una reseña a un producto
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *             required:
 *               - rating
 *               - comment
 *     responses:
 *       201:
 *         description: Reseña añadida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 review:
 *                   type: object
 *       400:
 *         description: Datos inválidos
 */

router.get("/", getProductReviews);
router.post("/", addProductReview);

export default router;