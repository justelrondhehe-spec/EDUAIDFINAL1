import User from '../models/User.js';
import Lesson from '../models/Lesson.js';
import Activity from '../models/Activity.js';
import Notification from '../models/Notification.js'; // Import the new model

// --- EXISTING DASHBOARD LOGIC ---
export async function dashboard(req, res) {
  try {
    const [users, lessons, activities] = await Promise.all([
      User.find({}).select('-password').lean().catch(() => []),
      Lesson.find({}).lean().catch(() => []),
      Activity.find({}).lean().catch(() => []),
    ]);

    const totalStudents = (users || []).length;
    const activeLessons = (lessons || []).filter(l => l.published !== false).length;

    const computeUser = (u) => {
      const lp = u.lessonProgress ?? u.lesson_progress ?? {};
      const as = u.activityScores ?? u.activity_scores ?? {};
      const lessonKeys = Object.keys(lp || {});
      const activityKeys = Object.keys(as || {});
      const lessonCompleted = lessonKeys.filter(k => lp[k] && (lp[k].completed === true || lp[k].progressPercent === 100)).length;
      const activityCompleted = activityKeys.filter(k => as[k] && as[k].completed === true).length;
      const total = lessonKeys.length + activityKeys.length;
      const completed = lessonCompleted + activityCompleted;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { total, completed, percent };
    };

    const percents = (users || []).map(u => computeUser(u).percent);
    const avgProgress = percents.length ? Math.round(percents.reduce((a,b)=>a+b,0)/percents.length) : 0;

    let totalItems = 0, completedItems = 0;
    (users || []).forEach(u => {
      const { total, completed } = computeUser(u);
      totalItems += total;
      completedItems += completed;
    });
    const completionRate = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    const topPerformers = (users || []).map(u => ({
      student: { id: u._id, name: u.name, email: u.email },
      overallProgress: computeUser(u).percent
    })).sort((a,b) => b.overallProgress - a.overallProgress).slice(0, 8);

    const recentActivities = (users || []).slice().reverse().slice(0, 10).map(u => ({
      id: u._id,
      message: `${u.name || u.email} joined`,
      timestamp: u.updatedAt || u.createdAt || new Date(),
      color: 'bg-indigo-400',
    }));

    const dayMs = 24 * 60 * 60 * 1000;
    const now = Date.now();
    const dailyActiveUsers = (users || []).filter(u => {
      const ts = u.lastLogin || u.updatedAt || u.createdAt;
      if (!ts) return false;
      return (now - new Date(ts).getTime()) <= dayMs;
    }).length;

    return res.json({
      totalStudents,
      activeLessons,
      avgProgress,
      completionRate,
      topPerformers,
      recentActivities,
      dailyActiveUsers
    });
  } catch (err) {
    console.error('adminController.dashboard error', err);
    return res.status(500).json({ message: 'Failed to compute dashboard' });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.find({}).select('-password').lean();
    const normalized = users.map(u => ({
      _id: u._id,
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
      lastLogin: u.lastLogin,
      lessonProgress: u.lessonProgress ?? u.lesson_progress ?? {},
      activityScores: u.activityScores ?? u.activity_scores ?? {},
    }));
    return res.json(normalized);
  } catch (err) {
    console.error('adminController.getUsers error', err);
    return res.status(500).json({ message: 'Failed to fetch users' });
  }
}

// --- NEW NOTIFICATION LOGIC ---

// GET /api/admin/notifications
export async function getNotifications(req, res) {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
}

// PUT /api/admin/notifications/read-all
export async function markAllRead(req, res) {
  try {
    await Notification.updateMany({ read: false }, { $set: { read: true } });
    res.json({ success: true });
  } catch (error) {
    console.error('Error marking notifications:', error);
    res.status(500).json({ message: 'Error updating notifications' });
  }
}

// POST /api/admin/notifications/test (For debugging)
export async function createTestNotification(req, res) {
  try {
    const newNotif = await Notification.create({
      type: 'new_enrollment',
      title: 'New Student Enrollment',
      message: 'A new student has joined EduAid!',
      read: false
    });
    res.status(201).json(newNotif);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}