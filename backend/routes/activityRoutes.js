import express from "express";
import {
  getActivities,
  addActivity,
  updateActivity,
  deleteActivity
} from "../controllers/activityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getActivities);
router.post("/", protect, addActivity);
router.put("/:id", protect, updateActivity);
router.delete("/:id", protect, deleteActivity);

export default router;
