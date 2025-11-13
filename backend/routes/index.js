import express from "express";
import authRoutes from "./authRoutes.js";
import lessonRoutes from "./lessonRoutes.js";
import activityRoutes from "./activityRoutes.js";
import settingsRoutes from "./settingsRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/lessons", lessonRoutes);
router.use("/activities", activityRoutes);
router.use("/settings", settingsRoutes);
router.use("/admin", adminRoutes);

export default router;
