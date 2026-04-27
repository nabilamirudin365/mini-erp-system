import express from "express";
import { getUsers, getUsersById, updateUser, deleteUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";
import { roleMiddleware } from "../middleware/role.js";

const router = express.Router();

// Terapkan RBAC: Seluruh operasi users hanya boleh dilakukan oleh admin
router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.get("/", getUsers);
router.get("/:id", getUsersById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
