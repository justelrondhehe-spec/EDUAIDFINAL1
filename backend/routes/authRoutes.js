// backend/routes/authRoutes.js
import express from "express";
import { login, register, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  startTwoFactorSetup,
  verifyTwoFactorSetup,
  verifyTwoFactorLogin,
} from "../controllers/twoFactorController.js";

const router = express.Router();

// REGISTER
router.post("/register", register);

// LOGIN (password step)
router.post("/login", login);

// CURRENT USER (used by frontend auth.me())
router.get("/me", protect, getMe);

// 2FA – setup (user must already be logged in)
router.post("/2fa/setup", protect, startTwoFactorSetup);
router.post("/2fa/verify-setup", protect, verifyTwoFactorSetup);

// 2FA – login verification (after password + tempToken)
router.post("/2fa/login", verifyTwoFactorLogin);

export default router;
