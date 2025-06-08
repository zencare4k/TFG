import { Router } from "express";
import { getProductDetails } from "../Controllers/products.js"; // Controlador para obtener detalles del producto

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Gestión de productos
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener detalles de un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Detalles del producto obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 category:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *       404:
 *         description: Producto no encontrado
 */

router.get("/:id", getProductDetails);

export default router;