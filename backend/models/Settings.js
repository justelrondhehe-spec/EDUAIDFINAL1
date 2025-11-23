// backend/models/Settings.js
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    // General
    appName: { type: String, default: "EduAid" },

    // Notifications
    enableEmailNotifications: { type: Boolean, default: true },
    enablePushNotifications: { type: Boolean, default: true },
    weeklySummaryEmail: { type: Boolean, default: true },

    // Access & maintenance
    allowStudentRegistration: { type: Boolean, default: true },
    maintenanceMode: { type: Boolean, default: false },
    maintenanceMessage: {
      type: String,
      default: "EduAid is currently under maintenance. Please check back soon.",
    },

    // UI flags (optional)
    darkMode: { type: Boolean, default: false },
    notifications: { type: Boolean, default: true },
    // ❌ IMPORTANT: no required user field here
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

// Create / reuse the model
const Settings =
  mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

export default Settings;
