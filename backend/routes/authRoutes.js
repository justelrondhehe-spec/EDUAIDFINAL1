// backend/routes/authRoutes.js
import express from "express";
import { login, register, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// CURRENT USER (used by frontend auth.me())
router.get("/me", protect, getMe);

export default router;
