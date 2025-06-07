import { Router } from "express";
import { registerUser, loginUser, forgotPassword, resetPassword } from "../Controllers/auth.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, systemAdmin, productAdmin]
 *                 default: user
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión con un usuario existente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Solicita el envío de un correo para restablecer la contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Correo de recuperación enviado
 *       404:
 *         description: Usuario no encontrado
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Restablece la contraseña usando el token recibido por correo
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Token inválido o expirado
 */
router.post("/reset-password", resetPassword);

export default router;