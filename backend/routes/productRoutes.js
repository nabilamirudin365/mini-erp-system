import express from "express";
import { getProducts, createProduct } from "../controllers/productController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getProducts);
router.post("/", authMiddleware, createProduct);

export default router;