// backend/routes/lessonRoutes.js
import express from "express";
import Lesson from "../models/Lesson.js";
import { sendAnnouncementToAllUsers } from "../utils/email.js";

const router = express.Router();

// GET /api/lessons
router.get("/", async (req, res) => {
  const docs = await Lesson.find().lean().exec();
  res.json(docs);
});

// GET /api/lessons/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const doc = await Lesson.findById(id).lean().exec();
  if (!doc) return res.status(404).json({ error: "Lesson not found" });
  res.json(doc);
});

// POST /api/lessons
router.post("/", async (req, res) => {
  try {
    const { sendAnnouncement, ...data } = req.body || {};
    const doc = await Lesson.create(data);

    // Optionally send announcement email
    if (sendAnnouncement) {
      sendAnnouncementToAllUsers({
        title: doc.title || "New Lesson Available",
        description: doc.description || "",
      }).catch((err) =>
        console.error("[lessonRoutes] announcement email failed", err)
      );
    }

    res.status(201).json(doc);
  } catch (err) {
    console.error("create lesson error", err);
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/lessons/:id
router.put("/:id", async (req, res) => {
  try {
    const { sendAnnouncement, ...data } = req.body || {};
    const doc = await Lesson.findByIdAndUpdate(req.params.id, data, {
      new: true,
    })
      .lean()
      .exec();
    if (!doc) return res.status(404).json({ error: "Lesson not found" });

    // Optional: send announcement when updating (e.g., publishing)
    if (sendAnnouncement) {
      sendAnnouncementToAllUsers({
        title: doc.title || "Lesson Updated",
        description: doc.description || "",
      }).catch((err) =>
        console.error("[lessonRoutes] update announcement email failed", err)
      );
    }

    res.json(doc);
  } catch (err) {
    console.error("update lesson error", err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/lessons/:id
router.delete("/:id", async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id).exec();
    res.json({ success: true });
  } catch (err) {
    console.error("delete lesson error", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
