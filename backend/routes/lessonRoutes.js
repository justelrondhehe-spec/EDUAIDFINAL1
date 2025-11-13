import express from "express";
import { getLessons, addLesson } from "../controllers/lessonController.js";

const router = express.Router();

router.get("/", getLessons);
router.post("/", addLesson);

export default router;
