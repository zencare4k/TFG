import { Router } from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "../Controllers/whishlist.js";

const router = Router();
router.post("/", addToWishlist);
router.get("/:userId", getWishlist);
router.delete("/:userId/:productId", removeFromWishlist);

export default router;