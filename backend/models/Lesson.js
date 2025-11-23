// backend/models/Lesson.js
import mongoose from "mongoose";

const lessonContentSchema = new mongoose.Schema(
  {
    introduction: { type: String },
    objectives: [{ type: String }],
    activities: [{ type: String }],
  },
  { _id: false } // don't create a separate _id for the nested doc
);

const lessonSchema = new mongoose.Schema(
  {
    id: { type: Number, required: false, index: true, unique: false }, // keep if you use numeric ids in seed data
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    duration: { type: String },
    progress: { type: Number, default: 0 },
    status: { type: String, enum: ["completed", "in-progress", "not-started"], default: "not-started" },
    difficulty: { type: String },
    rating: { type: Number },
    icon: { type: String },
    color: { type: String },
    lessons: { type: Number, default: 0 },
    completedLessons: { type: Number, default: 0 },
    content: { type: lessonContentSchema }, // <-- nested object
    published: { type: Boolean, default: true }, // admin UI uses published flag
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", lessonSchema);
