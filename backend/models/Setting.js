import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    language: { type: String, default: "en" },
    notificationsEnabled: { type: Boolean, default: true },
    privacyMode: { type: Boolean, default: false },
    accessibilityMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);
