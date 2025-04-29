import { Router } from "express";
import { getCartItems } from "../Controllers/cart.js"; // Importa el controlador del carrito

const router = Router();

// Endpoint para obtener los productos del carrito
router.get("/", getCartItems);

export default router;