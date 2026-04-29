import express from "express";
import { createTransaction, getTransactionHistory } from "../controllers/transactionController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getTransactionHistory);

export default router;