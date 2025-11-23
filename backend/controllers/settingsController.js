import Settings from "../models/Settings.js";

export const getSettings = async (req, res) => {
  const settings = await Settings.findOne({ user: req.user.id });
  res.json(settings);
};

export const updateSettings = async (req, res) => {
  const settings = await Settings.findOneAndUpdate(
    { user: req.user.id },
    req.body,
    { new: true, upsert: true }
  );

  res.json(settings);
};
