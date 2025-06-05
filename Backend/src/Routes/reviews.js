import { Router } from "express";
import { getProductReviews, addProductReview } from "../Controllers/reviews.js";

const router = Router({ mergeParams: true });

router.get("/", getProductReviews);
router.post("/", addProductReview);

export default router;