import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../Controllers/products.js";
import { authMiddleware, adminMiddleware } from "../Middleware/auth.js"; // Importar los middlewares de autenticación y administrador

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/products", getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
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
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/products/:id", getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Añadir un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: string
 *               originalPrice:
 *                 type: string
 *               discount:
 *                 type: string
 *               image:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto añadido exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post("/products", createProduct); // Eliminar authMiddleware y adminMiddleware

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualiza un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado
 *     security:
 *       - bearerAuth: []
 */
router.put("/products/:id", authMiddleware, adminMiddleware, updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
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
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *     security:
 *       - bearerAuth: []
 */
router.delete("/products/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;