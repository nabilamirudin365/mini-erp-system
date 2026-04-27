import express from "express";
import { getUsers, getUsersById } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUsersById);

export default router;
