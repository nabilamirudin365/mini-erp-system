import express from "express";
import { getSalesTrend, getTopProducts } from "../controllers/reportController.js";
import { authMiddleware } from "../middleware/auth.js";
import { roleMiddleware } from "../middleware/role.js";

const router = express.Router();

// Laporan hanya untuk admin
router.get("/sales-trend", authMiddleware, roleMiddleware("admin"), getSalesTrend);
router.get("/top-products", authMiddleware, roleMiddleware("admin"), getTopProducts);

export default router;
