// backend/controllers/activityController.js
import Activity from '../models/Activity.js';

export async function listActivities(req, res) {
  try {
    const activities = await Activity.find().lean();
    return res.json(activities);
  } catch (err) {
    console.error('activityController.listActivities error', err);
    return res.status(500).json({ message: 'Failed to fetch activities' });
  }
}

export async function createActivity(req, res) {
  try {
    const payload = req.body;
    // Optional: validate required fields minimally
    if (!payload.title) {
      return res.status(400).json({ message: 'title is required' });
    }

    const created = await Activity.create(payload);
    return res.status(201).json(created);
  } catch (err) {
    console.error('activityController.createActivity error', err);
    return res.status(500).json({ message: 'Failed to create activity', error: err.message });
  }
}
