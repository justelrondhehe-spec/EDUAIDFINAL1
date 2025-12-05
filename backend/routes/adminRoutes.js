import express from 'express';
import User from '../models/User.js';
import * as adminController from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { sendEmail } from "../utils/email.js";

const router = express.Router();

// --- Test Email Route ---
router.post("/test-email", async (req, res) => {
  try {
    const { to, subject, message } = req.body || {};
    const target = to || process.env.TEST_EMAIL_TO;
    if (!target) return res.status(400).json({ error: "No recipient specified." });

    await sendEmail({
      to: target,
      subject: subject || "EduAid – Test Email",
      text: message || "SMTP is working! 🎉",
    });

    res.json({ success: true });
  } catch (err) {
    console.error("POST /api/admin/test-email failed", err);
    res.status(500).json({ error: err.message });
  }
});

// --- Middleware ---
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin only' });
  }
  next();
};

// =================================================================
// PUBLIC ROUTES (No Login Required - Good for Testing)
// =================================================================

router.get('/dashboard', adminController.dashboard);

// ✅ MOVED HERE: Now you can hit this without a token!
router.post('/notifications/test', adminController.createTestNotification);


// =================================================================
// PROTECTED ROUTES (Login + Admin Role Required)
// =================================================================
// Everything below this line will require a valid Bearer Token
router.use(protect, adminOnly);

// User Management
router.get('/users', adminController.getUsers); 
router.put('/users/:id/role', async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
  res.json(user);
});
router.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Notifications (Real functionality stays protected)
router.get('/notifications', adminController.getNotifications);
router.put('/notifications/read-all', adminController.markAllRead);

export default router;