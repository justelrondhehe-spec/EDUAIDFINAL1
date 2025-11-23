// backend/jobs/notificationJobs.js
import User from "../models/User.js";
import Activity from "../models/Activity.js";
import { sendEmail, canReceiveEmail } from "../utils/email.js";

const HOUR_MS = 60 * 60 * 1000;

// Avoid sending weekly progress multiple times per day
let lastWeeklyProgressDate = null;
// Avoid sending learning tips multiple times per day
let lastLearningTipDate = null;

// Small helper to compute progress from user.lessonProgress + user.activityScores
function computeUserProgress(user) {
  const lessonProgress = user.lessonProgress || {};
  const activityScores = user.activityScores || {};

  const lessonKeys = Object.keys(lessonProgress);
  const activityKeys = Object.keys(activityScores);

  const lessonCompleted = lessonKeys.filter((k) => {
    const it = lessonProgress[k];
    return it && (it.completed === true || it.completed === 1 || it.status === "completed");
  }).length;

  const activityCompleted = activityKeys.filter((k) => {
    const it = activityScores[k];
    return it && (it.completed === true || it.completed === 1 || it.status === "completed");
  }).length;

  const total = lessonKeys.length + activityKeys.length;
  const completed = lessonCompleted + activityCompleted;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, completed, percent };
}

/**
 * 1) Weekly progress report (runs once every Monday morning around 7 AM)
 */
async function runWeeklyProgressJob() {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10); // YYYY-MM-DD

  // Only run on Monday
  if (now.getDay() !== 1) return;

  // Only once per day (in case server stays up long)
  if (lastWeeklyProgressDate === todayStr) return;
  lastWeeklyProgressDate = todayStr;

  console.log("[jobs] Weekly progress job running for", todayStr);

  const users = await User.find({
    "notificationSettings.email.weeklyProgressReport": true,
    "notificationSettings.email.frequency": { $ne: "never" },
  }).lean();

  for (const u of users) {
    if (!canReceiveEmail(u, "weeklyProgress")) continue;

    const { total, completed, percent } = computeUserProgress(u);

    const subject = "Your EduAid Weekly Progress Report";
    const text =
      `Hi ${u.name || "there"},\n\n` +
      `Here is your weekly progress on EduAid:\n\n` +
      `• Total lessons & activities started: ${total}\n` +
      `• Completed: ${completed}\n` +
      `• Overall progress: ${percent}%\n\n` +
      `Keep going – every small step counts! 🌟\n\n` +
      `Love,\nEduAid`;

    try {
      await sendEmail({ to: u.email, subject, text });
    } catch (err) {
      console.error("[jobs] weeklyProgress email failed for", u.email, err);
    }
  }
}

/**
 * 2) Lesson expiration reminders (expiring within ~1 hour)
 */
async function runLessonReminderJob() {
  const now = new Date();
  const users = await User.find({
    "notificationSettings.push.lessonReminders": true,
  }).lean();

  for (const u of users) {
    if (!canReceiveEmail(u, "lessonReminder")) continue;

    const lessonProgress = u.lessonProgress || {};
    const soonExpiring = [];

    Object.values(lessonProgress).forEach((lp) => {
      if (!lp) return;
      if (lp.completed) return;
      if (!lp.expirationDate) return;

      const exp = new Date(lp.expirationDate);
      const diffMs = exp.getTime() - now.getTime();

      // Between 0 and 1 hour from now
      if (diffMs > 0 && diffMs <= HOUR_MS) {
        soonExpiring.push(lp);
      }
    });

    if (!soonExpiring.length) continue;

    const subject = "EduAid: Lesson Reminder";
    const lines = soonExpiring
      .map(
        (lp) =>
          `• Lesson ${lp.lessonId} expires at ${new Date(
            lp.expirationDate
          ).toLocaleString()}`
      )
      .join("\n");

    const text =
      `Hi ${u.name || "there"},\n\n` +
      `Some of your lessons are expiring soon:\n\n` +
      `${lines}\n\n` +
      `Try to finish them so you don't lose your progress. 💪\n\n` +
      `EduAid`;

    try {
      await sendEmail({ to: u.email, subject, text });
    } catch (err) {
      console.error("[jobs] lessonReminder email failed for", u.email, err);
    }
  }
}

/**
 * 3) Activity due reminders (due within ~1 hour)
 */
async function runActivityDueJob() {
  const now = new Date();
  const users = await User.find({
    "notificationSettings.push.activityDueDates": true,
  }).lean();

  for (const u of users) {
    if (!canReceiveEmail(u, "activityDue")) continue;

    const activityScores = u.activityScores || {};
    const soonDue = [];

    Object.values(activityScores).forEach((a) => {
      if (!a) return;
      if (a.completed) return;
      if (!a.dueDate) return;

      const due = new Date(a.dueDate);
      const diffMs = due.getTime() - now.getTime();

      // Between 0 and 1 hour from now
      if (diffMs > 0 && diffMs <= HOUR_MS) {
        soonDue.push(a);
      }
    });

    if (!soonDue.length) continue;

    const subject = "EduAid: Activity Due Soon";
    const lines = soonDue
      .map(
        (a) =>
          `• Activity ${a.activityId} due at ${new Date(
            a.dueDate
          ).toLocaleString()}`
      )
      .join("\n");

    const text =
      `Hi ${u.name || "there"},\n\n` +
      `You have activities that are due soon:\n\n` +
      `${lines}\n\n` +
      `Try your best to finish them in time. 🌈\n\n` +
      `EduAid`;

    try {
      await sendEmail({ to: u.email, subject, text });
    } catch (err) {
      console.error("[jobs] activityDue email failed for", u.email, err);
    }
  }
}

/**
 * 4) Learning tips (simple daily tip)
 */
async function runLearningTipsJob() {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  // Only once per day
  if (lastLearningTipDate === todayStr) return;
  lastLearningTipDate = todayStr;

  const users = await User.find({
    "notificationSettings.email.learningTips": true,
    "notificationSettings.email.frequency": { $ne: "never" },
  }).lean();

  if (!users.length) return;

  const subject = "EduAid Daily Learning Tip";
  const text =
    "Here’s a simple tip for today:\n\n" +
    "🧠 Take short breaks while learning. A 5-minute stretch can help your brain reset and focus better.\n\n" +
    "You’re doing great – keep it up! 💖\n\n" +
    "EduAid";

  for (const u of users) {
    if (!canReceiveEmail(u, "learningTip")) continue;

    try {
      await sendEmail({ to: u.email, subject, text });
    } catch (err) {
      console.error("[jobs] learningTip email failed for", u.email, err);
    }
  }
}

// Very simple scheduler using setInterval
// Runs every 15 minutes
setInterval(() => {
  const now = new Date();
  console.log("[jobs] notificationJobs tick", now.toISOString());

  // Weekly progress (Mon mornings)
  if (now.getMinutes() < 5) {
    // only check near top of the hour to avoid too many checks
    runWeeklyProgressJob().catch((err) =>
      console.error("[jobs] weekly progress error", err)
    );
  }

  // Lesson + activity reminders (every tick)
  runLessonReminderJob().catch((err) =>
    console.error("[jobs] lesson reminder error", err)
  );
  runActivityDueJob().catch((err) =>
    console.error("[jobs] activity due error", err)
  );

  // Learning tips once per day
  if (now.getHours() === 8) {
    runLearningTipsJob().catch((err) =>
      console.error("[jobs] learning tips error", err)
    );
  }
}, 15 * 60 * 1000);

console.log("[jobs] notificationJobs initialized");
