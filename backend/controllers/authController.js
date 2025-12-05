import User from "../models/User.js";
import Notification from "../models/Notification.js"; // 1. Added Import
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const sanitizeUser = (userDoc) => {
  const user = userDoc.toObject ? userDoc.toObject() : { ...userDoc };
  if (user.password) delete user.password;
  return user;
};

export const getMe = async (req, res, next) => {
  try {
    // protect middleware should have attached req.userId or req.user
    const userId = req.user && (req.user._id || req.user.id || req.user.userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: "Email already taken" });

    const hashed = await bcrypt.hash(password, 10);

    // 2. User is created here (CRITICAL STEP)
    const user = await User.create({ name, email, password: hashed });

    // 3. FAIL-SAFE NOTIFICATION TRIGGER
    // We wrap this in its own try/catch so it never blocks the user registration
    try {
      await Notification.create({
        type: 'new_enrollment',
        title: 'New Student Enrollment',
        message: `${name} has enrolled in the platform`,
        read: false
      });
    } catch (notifErr) {
      // Just log the error, don't stop the registration
      console.error("Failed to create enrollment notification:", notifErr);
    }

    const token = generateToken(user);

    // 4. Return success response
    return res.status(201).json({
      success: true,
      message: "User registered",
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const token = generateToken(user);

    return res.json({
      success: true,
      message: "Login success",
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    next(err);
  }
};