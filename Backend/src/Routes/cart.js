import { Router } from "express";
import { getCartItems, addToCart, removeFromCart } from "../Controllers/cart.js";

const router = Router();

// Endpoint para obtener los productos del carrito
router.get("/", getCartItems);

// Endpoint para añadir un producto al carrito
router.post("/", addToCart);

// Endpoint para eliminar un producto del carrito
router.delete("/:productId", removeFromCart);

export default router;