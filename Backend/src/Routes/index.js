import { Router } from "express";
import users from "./users.js";
import auth from "./auth.js";
import products from "./products.js";
import cart from "./cart.js"; // Importar las rutas del carrito
import productRoutes from "./ProductRoutes.js"; // Importar las rutas de productos

const router = Router();

router.use("/users", users);
router.use("/auth", auth);
router.use("/products", products);
router.use("/cart", cart); // Registrar las rutas del carrito
router.use("/product", productRoutes); // Registrar las rutas de productos

export default router;