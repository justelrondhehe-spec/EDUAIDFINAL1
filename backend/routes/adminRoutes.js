import express from "express";
import { getAdminStats, deleteUser } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, getAdminStats);
router.delete("/user/:id", protect, adminOnly, deleteUser);

export default router;
