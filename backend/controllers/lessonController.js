import Lesson from "../models/Lesson.js";

export const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ createdAt: -1 });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addLesson = async (req, res) => {
  try {
    const newLesson = await Lesson.create(req.body);
    res.status(201).json(newLesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
