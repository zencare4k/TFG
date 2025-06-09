import express from "express";
import { sendOrderConfirmation, sendSupportMessage } from "../Controllers/Nodemailer.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Email
 *     description: Envío de correos electrónicos
 */

/**
 * @swagger
 * /api/email/order-confirmation:
 *   post:
 *     summary: Enviar correo de confirmación de pedido
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 description: Correo electrónico del destinatario
 *               subject:
 *                 type: string
 *                 description: Asunto del correo
 *               text:
 *                 type: string
 *                 description: Cuerpo del correo en texto plano
 *               html:
 *                 type: string
 *                 description: Cuerpo del correo en HTML
 *             required:
 *               - to
 *               - subject
 *               - text
 *     responses:
 *       200:
 *         description: Correo enviado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al enviar el correo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

router.post("/order-confirmation", sendOrderConfirmation);
router.post("/support", sendSupportMessage); // <-- Añade esta línea

export default router;