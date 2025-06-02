// filepath: c:\Users\zenca\Documents\GitHub\TFG\Backend\src\Routes\checkout.js
import express from "express";
import { processCheckout } from "../Controllers/checkout.js";
import { authMiddleware } from "../Middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, processCheckout);
export default router;