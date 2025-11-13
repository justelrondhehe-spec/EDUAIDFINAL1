import Activity from "../models/Activity.js";

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addActivity = async (req, res) => {
  try {
    const newActivity = await Activity.create(req.body);
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: "Activity deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
