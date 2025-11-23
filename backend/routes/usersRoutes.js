// backend/routes/usersRoutes.js
import express from "express";
import User from "../models/User.js";
import { sendEmail, canReceiveEmail } from "../utils/email.js";

const router = express.Router();

/**
 * GET /api/users
 * Used by GlobalDataContext for admin dashboards.
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).select("-password").lean().exec();
    res.json(users);
  } catch (err) {
    console.error("GET /api/users failed", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /api/users/:id/profile
 * Update basic profile fields for a user.
 */
router.put("/:id/profile", async (req, res) => {
  try {
    const id = req.params.id;

    const {
      firstName,
      lastName,
      name, // optional: if you treat name = "First Last"
      grade,
      phoneNumber,
      dateOfBirth,
      address,
      bio,
    } = req.body || {};

    const update = {};

    if (typeof firstName === "string") update.firstName = firstName;
    if (typeof lastName === "string") update.lastName = lastName;
    if (typeof name === "string") update.name = name;
    if (typeof grade === "string") update.grade = grade;
    if (typeof phoneNumber === "string") update.phoneNumber = phoneNumber;
    if (typeof address === "string") update.address = address;
    if (typeof bio === "string") update.bio = bio;
    if (dateOfBirth) {
      const d = new Date(dateOfBirth);
      if (!isNaN(d.getTime())) update.dateOfBirth = d;
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("PUT /api/users/:id/profile failed", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/users/:id
 * Used by AppContext to load per-user progress.
 */
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).lean().exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    delete user.password;
    res.json(user);
  } catch (err) {
    console.error("GET /api/users/:id failed", err);
    res.status(500).json({ error: err.message });
  }
});

// --- Accessibility settings ---
router.get("/:id/accessibility-settings", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).lean().exec();
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.accessibilitySettings || {});
  } catch (err) {
    console.error("GET /api/users/:id/accessibility-settings failed", err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id/accessibility-settings", async (req, res) => {
  try {
    const id = req.params.id;
    const patch = req.body || {};

    const user = await User.findById(id).exec();
    if (!user) return res.status(404).json({ error: "User not found" });

    const current = user.accessibilitySettings || {};
    user.accessibilitySettings = {
      ...(current.toObject ? current.toObject() : current),
      ...patch,
    };

    await user.save();
    res.json(user.accessibilitySettings);
  } catch (err) {
    console.error("PUT /api/users/:id/accessibility-settings failed", err);
    res.status(500).json({ error: err.message });
  }
});

// --- Guardian settings ---
router.get("/:id/guardian-settings", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).lean().exec();
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.guardianSettings || {});
  } catch (err) {
    console.error("GET /api/users/:id/guardian-settings failed", err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id/guardian-settings", async (req, res) => {
  try {
    const id = req.params.id;
    const patch = req.body || {};

    const user = await User.findById(id).exec();
    if (!user) return res.status(404).json({ error: "User not found" });

    const current = user.guardianSettings || {};
    user.guardianSettings = {
      ...(current.toObject ? current.toObject() : current),
      ...patch,
    };

    await user.save();
    res.json(user.guardianSettings);
  } catch (err) {
    console.error("PUT /api/users/:id/guardian-settings failed", err);
    res.status(500).json({ error: err.message });
  }
});

// --- Language & Region settings ---
router.get("/:id/language-region-settings", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).lean().exec();
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.languageRegionSettings || {});
  } catch (err) {
    console.error("GET /api/users/:id/language-region-settings failed", err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id/language-region-settings", async (req, res) => {
  try {
    const id = req.params.id;
    const patch = req.body || {};

    const user = await User.findById(id).exec();
    if (!user) return res.status(404).json({ error: "User not found" });

    const current = user.languageRegionSettings || {};
    user.languageRegionSettings = {
      ...(current.toObject ? current.toObject() : current),
      ...patch,
    };

    await user.save();
    res.json(user.languageRegionSettings);
  } catch (err) {
    console.error("PUT /api/users/:id/language-region-settings failed", err);
    res.status(500).json({ error: err.message });
  }
});

// --- Privacy & Security settings ---
router.get("/:id/privacy-settings", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).lean().exec();
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.privacySettings || {});
  } catch (err) {
    console.error("GET /api/users/:id/privacy-settings failed", err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id/privacy-settings", async (req, res) => {
  try {
    const id = req.params.id;
    const patch = req.body || {};

    const user = await User.findById(id).exec();
    if (!user) return res.status(404).json({ error: "User not found" });

    const current = user.privacySettings || {};
    user.privacySettings = {
      ...(current.toObject ? current.toObject() : current),
      ...patch,
    };

    await user.save();
    res.json(user.privacySettings);
  } catch (err) {
    console.error("PUT /api/users/:id/privacy-settings failed", err);
    res.status(500).json({ error: err.message });
  }
});

// --- Notification settings (per user) ---
router.get("/:id/notification-settings", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).lean().exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const settings = user.notificationSettings || {};
    res.json(settings);
  } catch (err) {
    console.error("GET /api/users/:id/notification-settings failed", err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id/notification-settings", async (req, res) => {
  try {
    const id = req.params.id;
    const patch = req.body || {};

    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const current = user.notificationSettings || {};

    user.notificationSettings = {
      ...current,
      ...patch,
      push: {
        ...(current.push || {}),
        ...(patch.push || {}),
      },
      email: {
        ...(current.email || {}),
        ...(patch.email || {}),
      },
      messages: {
        ...(current.messages || {}),
        ...(patch.messages || {}),
      },
      quietHours: {
        ...(current.quietHours || {}),
        ...(patch.quietHours || {}),
      },
    };

    await user.save();
    const out = user.toObject();
    delete out.password;

    res.json(out.notificationSettings);
  } catch (err) {
    console.error("PUT /api/users/:id/notification-settings failed", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /api/users/:id/progress
 * Merge / update lessonProgress and activityScores for a user
 */
router.put("/:id/progress", async (req, res) => {
  try {
    const id = req.params.id;
    const patch = req.body || {};

    const user = await User.findById(id).exec();
    if (!user) return res.status(404).json({ error: "User not found" });

    const prevLessonProgress = user.lessonProgress
      ? user.lessonProgress.toObject
        ? user.lessonProgress.toObject()
        : { ...user.lessonProgress }
      : {};
    const prevActivityScores = user.activityScores
      ? user.activityScores.toObject
        ? user.activityScores.toObject()
        : { ...user.activityScores }
      : {};

    user.lessonProgress = user.lessonProgress || {};
    user.activityScores = user.activityScores || {};

    if (patch.lessonProgress && typeof patch.lessonProgress === "object") {
      Object.entries(patch.lessonProgress).forEach(([k, v]) => {
        const incoming = v || {};
        const existing = user.lessonProgress[k];

        user.lessonProgress[k] = {
          ...(existing && existing.toObject ? existing.toObject() : existing || {}),
          ...incoming,
        };
      });
    }

    if (patch.activityScores && typeof patch.activityScores === "object") {
      Object.entries(patch.activityScores).forEach(([k, v]) => {
        const incoming = v || {};
        const existing = user.activityScores[k];

        user.activityScores[k] = {
          ...(existing && existing.toObject ? existing.toObject() : existing || {}),
          ...incoming,
        };
      });
    }

    const newlyCompletedLessons = [];
    Object.entries(user.lessonProgress || {}).forEach(([key, lp]) => {
      const before = prevLessonProgress[key];
      const wasCompleted = !!before?.completed;
      const isNowCompleted = !!lp?.completed;
      if (!wasCompleted && isNowCompleted) {
        newlyCompletedLessons.push({ id: key, data: lp });
      }
    });

    const newlyCompletedActivities = [];
    Object.entries(user.activityScores || {}).forEach(([key, as]) => {
      const before = prevActivityScores[key];
      const wasCompleted = !!before?.completed;
      const isNowCompleted = !!as?.completed;
      if (!wasCompleted && isNowCompleted) {
        newlyCompletedActivities.push({ id: key, data: as });
      }
    });

    await user.save();
    const out = user.toObject();
    delete out.password;
    res.json(out);

    const shouldEmail = canReceiveEmail(user);
    const emailSettings = user.notificationSettings?.email || {};

    if (shouldEmail && (emailSettings.weeklyProgressReport || emailSettings.announcements)) {
      const prefix = "EduAid Progress Update";

      for (const { id: lessonId } of newlyCompletedLessons) {
        const title = `Lesson Completed: Lesson ${lessonId}`;
        const subject = `${prefix} – ${title}`;
        const text = `Hi ${user.name || "there"},\n\nYou just completed lesson ${lessonId} on EduAid.\n\nGreat work! 🎉\n\n– EduAid`;
        sendEmail({ to: user.email, subject, text }).catch(console.error);
      }

      for (const { id: actId, data } of newlyCompletedActivities) {
        const score = data.score ?? 0;
        const maxScore = data.maxScore ?? 100;
        const percent = Math.round((score / (maxScore || 1)) * 100);
        const title = `Activity Completed: Activity ${actId}`;
        const subject = `${prefix} – ${title}`;
        const text = `Hi ${user.name || "there"},\n\nYou completed activity ${actId} with a score of ${score}/${maxScore} (${percent}%).\n\nNice job! ✅\n\n– EduAid`;
        sendEmail({ to: user.email, subject, text }).catch(console.error);
      }
    }
  } catch (err) {
    console.error("progress update failed", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
