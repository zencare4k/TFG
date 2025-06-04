import express from "express";
import { sendOrderConfirmation } from "../Controllers/Nodemailer.js";

const router = express.Router();

router.post("/order-confirmation", sendOrderConfirmation);

export default router;