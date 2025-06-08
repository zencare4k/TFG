import { Router } from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "../Controllers/whishlist.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Wishlist
 *     description: Lista de deseos de usuarios
 */

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Añadir un producto a la lista de deseos
 *     tags: [Wishlist]
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
 *             required:
 *               - userId
 *               - productId
 *     responses:
 *       201:
 *         description: Producto añadido a la lista de deseos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 wishlist:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Datos inválidos
 */
router.post("/", addToWishlist);

/**
 * @swagger
 * /api/wishlist/{userId}:
 *   get:
 *     summary: Obtener la lista de deseos de un usuario
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de deseos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: Usuario no encontrado o sin lista de deseos
 */
router.get("/:userId", getWishlist);

/**
 * @swagger
 * /api/wishlist/{userId}/{productId}:
 *   delete:
 *     summary: Eliminar un producto de la lista de deseos de un usuario
 *     tags: [Wishlist]
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
 *         description: Producto eliminado de la lista de deseos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 wishlist:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Producto o usuario no encontrado
 */
router.delete("/:userId/:productId", removeFromWishlist);

export default router;