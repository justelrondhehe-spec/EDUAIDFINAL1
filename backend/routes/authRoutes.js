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

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

router.post("/2fa/setup", protect, startTwoFactorSetup);
router.post("/2fa/verify-setup", protect, verifyTwoFactorSetup);
router.post("/2fa/login", verifyTwoFactorLogin);

export default router;
