import Setting from "../models/Setting.js";

export const getUserSettings = async (req, res) => {
  try {
    const settings = await Setting.findOne({ user: req.user.id });
    res.json(settings || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserSettings = async (req, res) => {
  try {
    const updated = await Setting.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
