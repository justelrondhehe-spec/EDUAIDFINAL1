import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    id: Number,
    question: String,
    type: { type: String },
    options: [String],
    correctAnswer: String,
  },
  { _id: false }
);

const activitySchema = new mongoose.Schema(
  {
    id: Number,
    title: { type: String, required: true },
    description: String,
    type: String,
    subject: String,
    dueDate: String,
    dueTimestamp: Number,
    status: { type: String, default: "pending" },
    priority: String,
    points: Number,
    progress: Number,
    totalQuestions: Number,
    grade: String,
    score: Number,
    completedDate: String,
    icon: String,
    color: String,
    relatedLessonId: Number,
    isLocked: Boolean,
    questions: [questionSchema],
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
