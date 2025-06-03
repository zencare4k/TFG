import { Router } from "express";
import { getCartItems, addToCart, removeFromCart, clearUserCart } from "../Controllers/cart.js";
import { authMiddleware } from "../Middleware/auth.js";
const router = Router();

router.post("/clear", authMiddleware, clearUserCart);
router.get("/", getCartItems);
router.post("/", addToCart);
// CORRIGE AQUÍ:
router.delete("/:userId/:productId", removeFromCart);

export default router;