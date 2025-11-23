// backend/routes/settingsRoutes.js
import express from "express";
import Settings from "../models/Settings.js";

const router = express.Router();

/**
 * Build default settings that are safe for first run.
 * These should match what your frontend Settings.tsx expects.
 */
function buildDefaultSettings() {
  return {
    appName: "EduAid",
    enableEmailNotifications: false,
    enablePushNotifications: false,
    weeklySummaryEmail: false,
    allowStudentRegistration: true,
    maintenanceMode: false,
    maintenanceMessage:
      "EduAid is briefly down for maintenance. Please check back soon.",
  };
}

/**
 * GET /api/settings
 * Returns the single settings document (creating it with defaults if missing)
 */
router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne().lean().exec();

    if (!settings) {
      // create with sane defaults instead of {}
      const defaults = buildDefaultSettings();
      const created = await Settings.create(defaults);
      settings = created.toObject();
    }

    res.json(settings);
  } catch (err) {
    console.error("GET /api/settings failed", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /api/settings
 * Updates (or creates) the singleton settings document.
 * Body can be a partial set of fields.
 */
router.put("/", async (req, res) => {
  try {
    const update = req.body || {};

    // If you want to prevent unknown fields, you can filter `update` here

    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: update },
      { new: true, upsert: true }
    )
      .lean()
      .exec();

    res.json(settings);
  } catch (err) {
    console.error("PUT /api/settings failed", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
