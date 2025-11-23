// backend/routes/activityRoutes.js
import express from "express";
import Activity from "../models/Activity.js";
import { sendAnnouncementToAllUsers } from "../utils/email.js";

const router = express.Router();

// GET /api/activities
router.get("/", async (req, res) => {
  const docs = await Activity.find().lean().exec();
  res.json(docs);
});

// GET /api/activities/:id
router.get("/:id", async (req, res) => {
  const doc = await Activity.findById(req.params.id).lean().exec();
  if (!doc) return res.status(404).json({ error: "Activity not found" });
  res.json(doc);
});

// POST /api/activities
router.post("/", async (req, res) => {
  try {
    const { sendAnnouncement, ...data } = req.body || {};
    const doc = await Activity.create(data);

    if (sendAnnouncement) {
      sendAnnouncementToAllUsers({
        title: doc.title || "New Activity Available",
        description: doc.description || "",
      }).catch((err) =>
        console.error("[activityRoutes] announcement email failed", err)
      );
    }

    res.status(201).json(doc);
  } catch (err) {
    console.error("create activity error", err);
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/activities/:id
router.put("/:id", async (req, res) => {
  try {
    const { sendAnnouncement, ...data } = req.body || {};
    const doc = await Activity.findByIdAndUpdate(req.params.id, data, {
      new: true,
    })
      .lean()
      .exec();
    if (!doc) return res.status(404).json({ error: "Activity not found" });

    if (sendAnnouncement) {
      sendAnnouncementToAllUsers({
        title: doc.title || "Activity Updated",
        description: doc.description || "",
      }).catch((err) =>
        console.error("[activityRoutes] update announcement email failed", err)
      );
    }

    res.json(doc);
  } catch (err) {
    console.error("update activity error", err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/activities/:id
router.delete("/:id", async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id).exec();
    res.json({ success: true });
  } catch (err) {
    console.error("delete activity error", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
