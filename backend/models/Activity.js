import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: String,
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
    relatedLesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
