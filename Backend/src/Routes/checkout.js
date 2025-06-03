import { Router } from "express";
import { processCheckout } from "../Controllers/checkout.js";
import { authMiddleware } from "../Middleware/auth.js";
/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Procesar el checkout y crear un PaymentIntent de Stripe
 *     tags:
 *       - Checkout
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   postal:
 *                     type: string
 *                   country:
 *                     type: string
 *               cartItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: integer
 *                     imageUrl:
 *                       type: string
 *               total:
 *                 type: number
 *             required:
 *               - address
 *               - cartItems
 *               - total
 *     responses:
 *       200:
 *         description: PaymentIntent creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 clientSecret:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Datos de usuario o carrito inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Error en el pago
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

const router = Router();
router.post("/", authMiddleware, processCheckout);
export default router;