import { Router } from "express";
import { getProductDetails } from "../Controllers/products.js"; // Controlador para obtener detalles del producto

const router = Router();

// Ruta para obtener los detalles de un producto por ID
router.get("/:id", getProductDetails);

export default router;