// backend/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // basic profile fields
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    phoneNumber: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    bio: { type: String, trim: true, default: "" },
    dateOfBirth: { type: Date, default: null },

    // progress data (optional)
    lessonProgress: { type: mongoose.Schema.Types.Mixed },
    activityScores: { type: mongoose.Schema.Types.Mixed },
    lastLogin: { type: Date },

    // 🔔 per-user notification preferences
    notificationSettings: {
      push: {
        enableAll: { type: Boolean, default: true },
        lessonReminders: { type: Boolean, default: true },
        activityDueDates: { type: Boolean, default: true },
        achievements: { type: Boolean, default: true },
      },
      email: {
        weeklyProgressReport: { type: Boolean, default: false },
        announcements: { type: Boolean, default: true },
        learningTips: { type: Boolean, default: false },
        // "instant" | "daily" | "weekly"
        frequency: { type: String, default: "daily" },
      },
      messages: {
        fromTeachers: { type: Boolean, default: true },
        guardianMessages: { type: Boolean, default: true },
        commentsFeedback: { type: Boolean, default: true },
      },
      quietHours: {
        enabled: { type: Boolean, default: false },
        // store as "HH:MM" (24h)
        startTime: { type: String, default: "22:00" },
        endTime: { type: String, default: "07:00" },
      },
    },

    // 🎛 Accessibility / learning support settings
    accessibilitySettings: {
      textSize: { type: String, default: "medium" }, // "small" | "medium" | "large" | "extra-large"
      dyslexiaFriendlyFont: { type: Boolean, default: false },
      highContrast: { type: Boolean, default: false },
      reduceMotion: { type: Boolean, default: false },
      showReadingRuler: { type: Boolean, default: false },
      audioInstructions: { type: Boolean, default: true },
      focusMode: { type: Boolean, default: false },
    },

    // 👨‍👩‍👧 Guardian / parent settings
    guardianSettings: {
      guardianName: { type: String },
      guardianEmail: { type: String },
      guardianPhone: { type: String },
      shareProgressReports: { type: Boolean, default: true },
      weeklySummaryEmail: { type: Boolean, default: false },
      allowGuardianLoginAlerts: { type: Boolean, default: true },
    },

    // 🌍 Language & region
    languageRegionSettings: {
      language: { type: String, default: "en" },
      locale: { type: String, default: "en-US" },
      timezone: { type: String, default: "Asia/Manila" },
      dateFormat: { type: String, default: "MM/DD/YYYY" },
      timeFormat: { type: String, default: "12h" }, // "12h" or "24h"
      showTranslatedInstructions: { type: Boolean, default: true },
    },

    // 🔐 Privacy & security
    privacySettings: {
      allowProfileSuggestions: { type: Boolean, default: false },
      showAchievementsOnProfile: { type: Boolean, default: true },
      shareAnonymousUsageData: { type: Boolean, default: true },
      loginAlerts: { type: Boolean, default: true },
      twoFactorEnabled: { type: Boolean, default: false }, // now actually used
    },

    // 🔐 2FA secret for Google Authenticator
    twoFactorSecret: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
