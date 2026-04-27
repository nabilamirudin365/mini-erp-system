import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";
import { roleMiddleware } from "../middleware/role.js";

const router = express.Router();

// Terapkan RBAC: Hanya token dengan role admin yang bisa mendaftarkan user baru
router.post("/register", authMiddleware, roleMiddleware("admin"), register);
router.post("/login", login);
router.post("/logout", logout); // Rute untuk menghapus cookie

export default router;