import { Router } from "express";
import users from "./users.js";
import auth from "./auth.js";
import products from "./products.js";
import cart from "./cart.js";
import wishlist from "./whishlist.js";
import checkoutRoutes from "./checkout.js";
import recommendationsRoutes from "./recomendations.js";
import emailRoutes from "./Nodemailer.js";
import reviewsRoutes from "./reviews.js"; // <-- Añade esta línea

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operaciones de usuarios
 *   - name: Auth
 *     description: Autenticación y registro
 *   - name: Products
 *     description: Gestión de productos
 *   - name: Cart
 *     description: Operaciones del carrito de compras
 *   - name: Wishlist
 *     description: Lista de deseos de usuarios
 *   - name: Checkout
 *     description: Operaciones de pago y checkout
 *   - name: Recommendations
 *     description: Recomendaciones de productos
 *   - name: Email
 *     description: Envío de correos electrónicos
 *   - name: Reviews
 *     description: Reseñas de productos
 */

const router = Router();
router.use("/users", users);
router.use("/email", emailRoutes);

router.use("/recommendations", recommendationsRoutes);
router.use("/auth", auth);
router.use("/products", products);
router.use("/cart", cart);
router.use("/wishlist", wishlist);
router.use("/checkout", checkoutRoutes);

export default router;