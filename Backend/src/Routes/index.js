import { Router } from "express";
import users from "./users.js";
import auth from "./auth.js";
import products from "./products.js";
import cart from "./cart.js";
import wishlist from "./whishlist.js";

const router = Router();

router.use("/users", users);
router.use("/auth", auth);
router.use("/products", products);
router.use("/cart", cart);
router.use("/wishlist", wishlist);

export default router;