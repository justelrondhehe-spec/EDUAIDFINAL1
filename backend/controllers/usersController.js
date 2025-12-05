// backend/controllers/userController.js
import User from '../models/User.js';

// Update a user's progress (partial update). Accepts { lessonProgress?: {...}, activityScores?: {...}, lastLogin?: Date }
export async function updateProgress(req, res) {
  const { id } = req.params;
  const patch = req.body || {};

  if (!id) return res.status(400).json({ message: 'Missing user id' });
  if (!patch || (typeof patch !== 'object')) return res.status(400).json({ message: 'Invalid payload' });

  try {
    const user = await User.findById(id).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Build merged objects to write
    const updatedFields = {};

    // Merge lessonProgress
    if (patch.lessonProgress && typeof patch.lessonProgress === 'object') {
      const existingLessonProgress = user.lessonProgress ?? user.lesson_progress ?? {};
      const mergedLessonProgress = { ...existingLessonProgress };

      Object.entries(patch.lessonProgress).forEach(([k, v]) => {
        // preserve existing fields and merge incoming
        const cur = mergedLessonProgress[k] || {};
        mergedLessonProgress[k] = {
          ...cur,
          ...v,
        };
      });

      updatedFields.lessonProgress = mergedLessonProgress;
    }

    // Merge activityScores
    if (patch.activityScores && typeof patch.activityScores === 'object') {
      const existingActivityScores = user.activityScores ?? user.activity_scores ?? {};
      const mergedActivityScores = { ...existingActivityScores };

      Object.entries(patch.activityScores).forEach(([k, v]) => {
        const cur = mergedActivityScores[k] || {};
        mergedActivityScores[k] = {
          ...cur,
          ...v,
        };
      });

      updatedFields.activityScores = mergedActivityScores;
    }

    // Optional: update lastLogin / updatedAt if client supplied
    if (patch.lastLogin) {
      updatedFields.lastLogin = patch.lastLogin;
    }

    // If nothing to update
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: 'No lessonProgress or activityScores provided' });
    }

    // Perform the update (set merged objects, preserve password)
    const updated = await User.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    ).select('-password').lean();

    return res.json(updated);
  } catch (err) {
    console.error('usersController.updateProgress error', err);
    return res.status(500).json({ message: 'Failed to update progress' });
  }
}

/**
 * GET /api/users
 * Return users without password, normalizing common fields expected by frontend.
 */
export async function listUsers(req, res) {
  try {
    const users = await User.find({}).select('-password').lean();
    const normalized = users.map(u => ({
      _id: u._id,
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
      lastLogin: u.lastLogin,
      lessonProgress: u.lessonProgress ?? u.lesson_progress ?? {},
      activityScores: u.activityScores ?? u.activity_scores ?? {},
    }));
    return res.json(normalized);
  } catch (err) {
    console.error('usersController.listUsers error', err);
    return res.status(500).json({ message: 'Failed to fetch users' });
  }
}

/**
 * PUT /api/users/:id/profile
 * Update basic profile info: name, email, phone, address, bio, dateOfBirth, etc.
 */
export async function updateUserProfile(req, res) {
  try {
    const { id } = req.params;

    const {
      firstName,
      lastName,
      name,
      email,
      phoneNumber,
      address,
      bio,
      dateOfBirth,
    } = req.body || {};

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;

    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (address !== undefined) user.address = address;
    if (bio !== undefined) user.bio = bio;

    if (dateOfBirth !== undefined && dateOfBirth !== "") {
      user.dateOfBirth = new Date(dateOfBirth); // frontend sends yyyy-mm-dd
    }

    const saved = await user.save();
    const safeUser = saved.toObject();
    delete safeUser.password;

    return res.json(safeUser);
  } catch (err) {
    console.error("usersController.updateUserProfile error", err);
    return res.status(500).json({
      message: "Failed to update profile",
      error: err.message,
    });
  }
}
