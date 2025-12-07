import express from "express";
import { login, register, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  startTwoFactorSetup,
  verifyTwoFactorSetup,
  verifyTwoFactorLogin,
} from "../controllers/twoFactorController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

// 2FA setup (must be logged in)
router.post("/2fa/setup", protect, startTwoFactorSetup);
router.post("/2fa/verify-setup", protect, verifyTwoFactorSetup);

// 2FA login (after password)
router.post("/2fa/login", verifyTwoFactorLogin);

export default router;
