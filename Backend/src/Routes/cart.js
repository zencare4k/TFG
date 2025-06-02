import { Router } from "express";
import { getCartItems, addToCart, removeFromCart, clearUserCart } from "../Controllers/cart.js";
import { authMiddleware } from "../Middleware/auth.js";
const router = Router();
// ...existing code...
router.post("/clear", authMiddleware, clearUserCart);
// Endpoint para obtener los productos del carrito
router.get("/", getCartItems);

// Endpoint para añadir un producto al carrito
router.post("/", addToCart);

// Endpoint para eliminar un producto del carrito
router.delete("/:productId", removeFromCart);

export default router;