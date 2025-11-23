import Lesson from "../models/Lesson.js";

export const getLessons = async (_, res) => {
  const lessons = await Lesson.find();
  res.json(lessons);
};
