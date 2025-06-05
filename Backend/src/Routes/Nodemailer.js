import express from "express";
import { sendOrderConfirmation } from "../Controllers/Nodemailer.js";

const router = express.Router();

// Ruta para enviar el correo de confirmación de pedido
router.post("/order-confirmation", sendOrderConfirmation);

export default router;