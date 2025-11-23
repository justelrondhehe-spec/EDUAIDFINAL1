import express from "express";
import {
  updateLessonProgress,
  updateActivityProgress
} from "../controllers/progressController.js";

const router = express.Router();

// PATCH /api/progress/lesson/:id
router.patch("/lesson/:id", updateLessonProgress);

// PATCH /api/progress/activity/:id
router.patch("/activity/:id", updateActivityProgress);

export default router;
