import mongoose from "mongoose";

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
        frequency: { type: String, default: "daily" },
      },
      messages: {
        fromTeachers: { type: Boolean, default: true },
        guardianMessages: { type: Boolean, default: true },
        commentsFeedback: { type: Boolean, default: true },
      },
      quietHours: {
        enabled: { type: Boolean, default: false },
        startTime: { type: String, default: "22:00" },
        endTime: { type: String, default: "07:00" },
      },
    },

    // 🎛 Accessibility / learning support settings
    accessibilitySettings: {
      textSize: { type: String, default: "medium" },
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
      timeFormat: { type: String, default: "12h" },
      showTranslatedInstructions: { type: Boolean, default: true },
    },

    // 🔐 Simple 2FA fields (no privacySettings object anymore)
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
