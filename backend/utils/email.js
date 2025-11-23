// backend/utils/email.js
import nodemailer from "nodemailer";
import User from "../models/User.js";

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_FROM,
  FRONTEND_URL,
} = process.env;

// Reuse a single transporter
let transporter = null;

function getTransporter() {
  if (!transporter) {
    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
      console.warn(
        "[email] Missing SMTP env vars; emails will be logged, not sent."
      );
      return null;
    }

    transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: Number(EMAIL_PORT) === 465, // true for 465, false for others
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }
  return transporter;
}

/**
 * Basic sendEmail helper.
 * Falls back to console.log if SMTP is not configured.
 */
export async function sendEmail({ to, subject, html, text }) {
  const from = EMAIL_FROM || EMAIL_USER || "no-reply@example.com";

  const mailOptions = {
    from,
    to,
    subject,
    text: text || "",
    html: html || text || "",
  };

  const t = getTransporter();
  if (!t) {
    console.log("[email] (dev mode) Would send email:", mailOptions);
    return { simulated: true };
  }

  const info = await t.sendMail(mailOptions);
  console.log("[email] Sent:", info.messageId);
  return info;
}

/**
 * Helper to decide if a user *should* receive a certain email,
 * based on user.notificationSettings.
 *
 * category:
 *   - "weeklyProgress"
 *   - "announcement"
 *   - "learningTip"
 *   - "lessonReminder"
 *   - "activityDue"
 *   - "comment"
 */
export function canReceiveEmail(user, category) {
  if (!user || !user.notificationSettings) return false;

  const ns = user.notificationSettings;

  switch (category) {
    case "weeklyProgress":
      return !!ns.email?.weeklyProgressReport;

    case "announcement":
      return !!ns.email?.announcements;

    case "learningTip":
      return !!ns.email?.learningTips;

    case "lessonReminder":
      return !!ns.push?.lessonReminders;

    case "activityDue":
      return !!ns.push?.activityDueDates;

    case "comment":
      return !!ns.messages?.commentsFeedback;

    default:
      // Unknown category -> be conservative and return false
      return false;
  }
}

/**
 * Send announcement emails to all subscribed users
 */
export async function sendAnnouncementToAllUsers({ title, description, link }) {
  try {
    const users = await User.find({
      "notificationSettings.email.announcements": true,
      "notificationSettings.email.frequency": { $ne: "never" },
    });

    if (!users.length) {
      console.log("[Email] No subscribers for announcements");
      return;
    }

    const appUrl = FRONTEND_URL || "http://localhost:3000";
    const subject = `EduAid Update: ${title}`;
    const text =
      `${title}\n\n${description || ""}\n\n` +
      (link ? `View it here: ${link}\n\n` : `Open EduAid: ${appUrl}\n\n`) +
      `Thank you for learning with EduAid!`;

    await Promise.all(
      users.map((u) =>
        sendEmail({
          to: u.email,
          subject,
          text,
        }).catch((err) =>
          console.error("[Email] Failed for user:", u.email, err)
        )
      )
    );

    console.log("[Email] Announcement sent to", users.length, "users.");
  } catch (err) {
    console.error("[Email] Announcement error:", err);
  }
}


/**
 * Check if the current time is inside the user's quiet hours.
 * quietHours: { enabled: boolean, startTime: "HH:MM", endTime: "HH:MM" }
 * Handles ranges that cross midnight (e.g. 22:00 -> 07:00).
 */
export function isWithinQuietHours(user, now = new Date()) {
  if (!user || !user.notificationSettings) return false;
  const qh = user.notificationSettings.quietHours || {};
  if (!qh.enabled) return false;

  const parse = (str) => {
    if (!str || typeof str !== "string") return null;
    const [hh, mm] = str.split(":").map((n) => Number(n));
    if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
    return hh * 60 + mm;
  };

  const start = parse(qh.startTime || "22:00");
  const end = parse(qh.endTime || "07:00");
  if (start === null || end === null) return false;

  const minutesNow = now.getHours() * 60 + now.getMinutes();

  if (start < end) {
    // e.g. 21:00 -> 23:00
    return minutesNow >= start && minutesNow < end;
  } else if (start > end) {
    // crosses midnight, e.g. 22:00 -> 07:00
    return minutesNow >= start || minutesNow < end;
  } else {
    // start === end: treat as no quiet hours
    return false;
  }
}