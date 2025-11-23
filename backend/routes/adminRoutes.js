// backend/routes/adminRoutes.js
import express from 'express';
import User from '../models/User.js';
import * as adminController from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js'; // your protect middleware
import { sendEmail } from "../utils/email.js";

const router = express.Router();

// ⬇️ Add this block somewhere after router is created

// POST /api/admin/test-email
// Quick way to verify SMTP + email.js config.
// Body (JSON):
//   {
//     "to": "your@email.com",   // optional; falls back to TEST_EMAIL_TO env
//     "subject": "optional",
//     "message": "optional message body"
//   }
router.post("/test-email", async (req, res) => {
  try {
    const { to, subject, message } = req.body || {};

    // If no `to` field, fall back to env var
    const target = to || process.env.TEST_EMAIL_TO;
    if (!target) {
      return res.status(400).json({
        error:
          "Please provide `to` in the request body or set TEST_EMAIL_TO in your .env file.",
      });
    }

    await sendEmail({
      to: target,
      subject: subject || "EduAid – Test Email",
      text:
        message ||
        "This is a test email from the EduAid backend. If you can read this, SMTP is working! 🎉",
    });

    res.json({ success: true });
  } catch (err) {
    console.error("POST /api/admin/test-email failed", err);
    res.status(500).json({ error: err.message });
  }
});

// admin guard middleware
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin only' });
  }
  next();
};

router.get('/dashboard', adminController.dashboard);


router.use(protect, adminOnly);

// GET /admin/users
router.get('/users', async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ users });
});

// PUT /admin/users/:id/role
router.put('/users/:id/role', async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
  res.json(user);
});

// DELETE /admin/users/:id
router.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

router.get('/users', adminController.getUsers);

export default router;
