import { Router } from "express";
import { getCartItems, addToCart, removeFromCart, clearUserCart } from "../Controllers/cart.js";
import { authMiddleware } from "../Middleware/auth.js";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operaciones del carrito de compras
 */

/**
 * @swagger
 * /api/cart/clear:
 *   post:
 *     summary: Vacía el carrito del usuario autenticado
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito vaciado correctamente
 *       401:
 *         description: No autorizado
 */
router.post("/clear", authMiddleware, clearUserCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Obtiene los productos del carrito del usuario autenticado
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Lista de productos en el carrito
 *   post:
 *     summary: Añade un producto al carrito
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *             required:
 *               - userId
 *               - productId
 *               - quantity
 *     responses:
 *       201:
 *         description: Producto añadido al carrito
 *       400:
 *         description: Datos inválidos
 */
router.get("/", getCartItems);
router.post("/", addToCart);

/**
 * @swagger
 * /api/cart/{userId}/{productId}:
 *   delete:
 *     summary: Elimina un producto específico del carrito de un usuario
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito
 *       404:
 *         description: Producto o usuario no encontrado
 */
router.delete("/:userId/:productId", removeFromCart);

export default router;