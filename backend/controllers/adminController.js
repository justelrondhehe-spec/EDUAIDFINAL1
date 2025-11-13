import User from "../models/User.js";
import Lesson from "../models/Lesson.js";
import Activity from "../models/Activity.js";

export const getAdminStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const lessonCount = await Lesson.countDocuments();
    const activityCount = await Activity.countDocuments();
    res.json({ userCount, lessonCount, activityCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
