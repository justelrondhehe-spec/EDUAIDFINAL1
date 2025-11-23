import User from "../models/User.js";

export async function updateLessonProgress(req, res) {
  try {
    const { id } = req.params;
    const { lessonId, completed } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.lessonProgress = user.lessonProgress || {};
    user.lessonProgress[lessonId] = { completed: !!completed };

    await user.save();
    res.json({ message: "Lesson progress updated", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function updateActivityProgress(req, res) {
  try {
    const { id } = req.params;
    const { activityId, completed } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.activityScores = user.activityScores || {};
    user.activityScores[activityId] = { completed: !!completed };

    await user.save();
    res.json({ message: "Activity progress updated", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
